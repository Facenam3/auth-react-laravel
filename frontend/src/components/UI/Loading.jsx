export default function LoadingPage({children}) {
    return (
        <div className="container mx-auto p-10 mt-10 text-center">
            <h1 className="text-xl text-white font-bold">
                {children}
            </h1> 
        </div>
    );
}