import { useRouteError } from 'react-router-dom';
import NotFound from './NotFoundPage/NotFound';

function ErrorBoundary(): JSX.Element {
    const error = useRouteError() as Error;

    return error.message === 'Not Found' ? (
        <NotFound />
    ) : (
        <section className="error-connection">
            <h1>Сервер улетел в космос, попробуйте позже!</h1>
        </section>
    );
}

export default ErrorBoundary;
