const appEnv = process.env.NEXT_PUBLIC_APP_ENV;
const isProduction = appEnv === "production" || !appEnv;

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      {!isProduction && (
        <div className="inline-flex items-center rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20 mb-4">
          {appEnv ?? "development"}
        </div>
      )}
      <h1 className="text-2xl font-bold">am-showcase</h1>
    </main>
  );
}
