export default function GlassmorphicCard({children, table}) {
    let cssClasses = " p-6 rounded-xl shadow-lg bg-white/15 backdrop-blur-lg border border-white/30 text-white mx-auto mt-10 ";

        if (table) {
            cssClasses += "max-w-5/6";
        } else {
            cssClasses += "max-w-1/5"
        }
    return (
        <div className={cssClasses} >
            {children}
        </div>
    );
}