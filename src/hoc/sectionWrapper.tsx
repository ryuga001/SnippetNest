import { ReactNode } from "react";

interface SectionWrapperProps {
    children: ReactNode;
}

const SectionWrapper = ({ children }: SectionWrapperProps) => {
    return (
        <section
            className="bg-gray-200 w-full px-12 py-4 h-full"
        >
            {children}
        </section>
    );
};

export default SectionWrapper;
