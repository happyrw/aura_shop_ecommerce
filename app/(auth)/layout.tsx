export default function RootLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <body className="clerk-provider" style={{ display: 'flex', width: "100vw", justifyContent: "center", marginTop: "20px", marginBottom: '20px' }}>
            {children}
        </body>
    );
};