import { ArgumentsHost, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { Response, Request } from "express";
import { PrismaService } from "src/prisma.service";

export class AllExceptionFilter implements ExceptionFilter {
    private isLogTableReady = false;

    constructor(private readonly prisma: PrismaService) { }

    private async ensureErrorLogTable(): Promise<void> {
        if (this.isLogTableReady) {
            return;
        }

        await this.prisma.$executeRawUnsafe(`
            CREATE TABLE IF NOT EXISTS error_logs (
                id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
                path VARCHAR(255) NOT NULL,
                method VARCHAR(10) NOT NULL,
                status_code INT NOT NULL,
                error_code VARCHAR(100) NOT NULL,
                error_message TEXT NOT NULL,
                stack_trace TEXT NULL,
                created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
            )
        `);

        this.isLogTableReady = true;
    }

    async catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        const status = exception instanceof HttpException
            ? exception.getStatus()
            : HttpStatus.INTERNAL_SERVER_ERROR;

        const message = exception instanceof HttpException
            ? exception.getResponse()
            : 'Internal Server Error';

        const errorMessage = typeof message === 'string'
            ? message
            : Array.isArray((message as any)?.message)
                ? (message as any).message.join(', ')
                : (message as any)?.message || JSON.stringify(message);

        const errorCode = exception?.code || 'UNKNOWN_ERROR';

        // Guardamos el evento en BD sin bloquear el flujo si el log falla.
        try {
            await this.ensureErrorLogTable();
            await this.prisma.$executeRaw`
                INSERT INTO error_logs (path, method, status_code, error_code, error_message, stack_trace)
                VALUES (${request.url}, ${request.method}, ${status}, ${String(errorCode)}, ${String(errorMessage)}, ${exception?.stack ? String(exception.stack) : null})
            `;
        } catch {
            // Si falla el guardado del log, continuamos con la respuesta HTTP.
        }

        response.status(status).json({
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            error: errorMessage,
            errorCode,
        });
    }
}