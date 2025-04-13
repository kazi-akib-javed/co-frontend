import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/context/authContext";

type MiddlewareWrapperProps = {
  children: React.ReactNode;
  publicRoutes?: string[]; // List of routes that don't require authentication
};

const MiddlewareWrapper: React.FC<MiddlewareWrapperProps> = ({
  children,
  publicRoutes = ["/", "/login", "/signup"], // Add public routes here
}) => {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    const isPublicRoute = publicRoutes.includes(router.pathname);

    // Redirect to login if the user is not authenticated and accessing a private route
    if (!user && !isPublicRoute) {
      router.replace("/");
    }
  }, [user, router, publicRoutes]);

  // If authenticated or on a public route, render the children
  return <>{children}</>;
};

export default MiddlewareWrapper;
