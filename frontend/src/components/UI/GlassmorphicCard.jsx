export default function GlassmorphicCard({children}) {
    return (
        <div className="
        p-6 rounded-xl shadow-lg
        bg-white/15
        backdrop-blur-lg
        border-border-white/30
        text-white
        max-w-1/6 mx-auto mt-10
        " >
            {children}
        </div>
    );
}