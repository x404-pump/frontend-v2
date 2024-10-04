import React from "react";

export interface ContainerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
    title?: string | React.ReactNode;
}