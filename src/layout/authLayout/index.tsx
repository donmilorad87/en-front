import { Suspense } from "react";
import { useLoaderData, useOutlet, Await } from "react-router-dom";

import { AuthProvider, User } from "../../hooks/useAuth";

export const AuthLayout = () => {
    const outlet = useOutlet();

    const { userPromise } = useLoaderData();

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Await
                resolve={userPromise}
                errorElement={<div className="error">Something went wrong!</div>}
            >
                {(user: User): JSX.Element => (
                    <AuthProvider userData={user}>{outlet}</AuthProvider>
                )}
            </Await>
        </Suspense>
    );
};
