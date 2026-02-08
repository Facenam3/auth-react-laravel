import GlassmorphicCard from "../GlassmorphicCard";

export default function FormInput({children, pageName, ...props}){
    return (
        <GlassmorphicCard>
            <h1 className="text-center mb-5 font-bold text-3xl text-rose-700">{pageName}</h1>
            <form {...props} className="p-5 text-center rounded-md border-2 border-rose-950">
                {children}
            </form>     
        </GlassmorphicCard>
    );
}