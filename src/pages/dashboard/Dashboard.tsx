const Dashboard = () => {
    const stats = [
        {
            title: "Total Users",
            value: "120",
            description: "Registered users",
        },
        {
            title: "Total Claims",
            value: "845",
            description: "Claims processed",
        },
        {
            title: "Pending Claims",
            value: "32",
            description: "Awaiting review",
        },
    ];

    return (
        <section>
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">
                    Dashboard
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                    Here's an overview of the RCM portal.
                </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                {stats.map((stat) => (
                    <div
                        key={stat.title}
                        className="rounded-lg border border-gray-200 bg-white p-5"
                    >
                        <p className="text-sm font-medium text-gray-500">
                            {stat.title}
                        </p>

                        <p className="mt-2 text-3xl font-bold text-gray-900">
                            {stat.value}
                        </p>

                        <p className="mt-1 text-xs text-gray-400">
                            {stat.description}
                        </p>
                    </div>
                ))}
            </div>

            <div className="mt-6 rounded-lg border border-gray-200 bg-white p-6">
                <h2 className="text-lg font-semibold text-gray-900">
                    Recent Activity
                </h2>

                <div className="mt-4 divide-y divide-gray-100">
                    <div className="flex items-center justify-between py-3">
                        <div>
                            <p className="text-sm font-medium text-gray-800">
                                New user registered
                            </p>

                            <p className="text-xs text-gray-500">
                                john@rcm.com
                            </p>
                        </div>

                        <span className="text-xs text-gray-400">
                            10 mins ago
                        </span>
                    </div>

                    <div className="flex items-center justify-between py-3">
                        <div>
                            <p className="text-sm font-medium text-gray-800">
                                Claim submitted
                            </p>

                            <p className="text-xs text-gray-500">
                                Claim #RCM-1042
                            </p>
                        </div>

                        <span className="text-xs text-gray-400">
                            1 hour ago
                        </span>
                    </div>

                    <div className="flex items-center justify-between py-3">
                        <div>
                            <p className="text-sm font-medium text-gray-800">
                                Claim approved
                            </p>

                            <p className="text-xs text-gray-500">
                                Claim #RCM-1038
                            </p>
                        </div>

                        <span className="text-xs text-gray-400">
                            3 hours ago
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Dashboard;