const blogs = [
    {
        id: 1,
        date: { day: "15", month: "May" },
        category: "Home Care",
        title: "Essential Home Care Services for Elderly Patients",
        desc: "Comprehensive guide to providing quality home care for seniors, including medication management and daily living assistance...",
        image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=80",
    },
    {
        id: 2,
        date: { day: "18", month: "May" },
        category: "Physiotherapy",
        title: "Post-Surgery Rehabilitation: Key Exercises for Recovery",
        desc: "Expert physiotherapy techniques and exercises to help patients recover faster from surgical procedures...",
        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=80",
    },
    {
        id: 3,
        date: { day: "21", month: "Apr" },
        category: "Blood Bank",
        title: "Blood Donation: Safety Guidelines and Health Benefits",
        desc: "Understanding the importance of blood donation, safety protocols, and how it benefits both donors and recipients...",
        image: "https://images.unsplash.com/photo-1615461066841-6116e61058f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=80",
    },
    {
        id: 4,
        date: { day: "22", month: "Jan" },
        category: "Elder Care",
        title: "Managing Chronic Conditions in Senior Citizens",
        desc: "Professional strategies for managing diabetes, hypertension, and other chronic conditions in elderly patients...",
        image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=80",
    },
    {
        id: 5,
        date: { day: "10", month: "Mar" },
        category: "Skilled Nursing",
        title: "Advanced Wound Care Techniques for Home Patients",
        desc: "Professional wound care management, infection prevention, and healing protocols for home healthcare settings...",
        image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=80",
    },
    {
        id: 6,
        date: { day: "05", month: "Feb" },
        category: "Post-Surgery Care",
        title: "Home Recovery After Major Surgery: A Complete Guide",
        desc: "Essential post-operative care tips, pain management, and recovery milestones for patients recovering at home...",
        image: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=500&q=80",
    },
];

const categoryColors: Record<string, string> = {
    "Home Care": "#4F46E5",
    "Physiotherapy": "#059669",
    "Blood Bank": "#DC2626",
    "Elder Care": "#7C3AED",
    "Skilled Nursing": "#2563EB",
    "Post-Surgery Care": "#EA580C",
};

export default function Blogs() {
    return (
        <div className="w-full flex flex-col items-center bg-white py-12 px-4">
            <div className="mb-2">
                <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Vydhyo Healthcare Services
                </span>
            </div>
            <h6 className="text-2xl font-bold text-center mb-10 text-gray-800">
Comprehensive healthcare services at your fingertips</h6>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl w-full">
                {/* Left Column */}
                <div className="flex flex-col gap-8">
                    {blogs
                        .filter((_, i) => i % 2 === 0)
                        .map((blog) => (
                            <div
                                key={blog.id}
                                className="flex bg-[#F8FAFC] rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                            >
                                <div className="relative w-48 min-w-[192px] h-48">
                                    <img
                                        src={blog.image}
                                        alt={blog.title}
                                        className="object-cover w-full h-full"
                                    />
                                    <div className="absolute top-3 left-3 bg-white rounded-xl px-4 py-2 flex flex-col items-center shadow-md">
                                        <span className="text-blue-700 font-bold text-xl leading-none">
                                            {blog.date.day}
                                        </span>
                                        <span className="text-gray-500 text-sm">{blog.date.month}</span>
                                    </div>
                                </div>
                                <div className="flex flex-col justify-center px-6 py-4">
                                    <span
                                        className="inline-block mb-3 px-3 py-1 rounded-full text-white text-xs font-semibold"
                                        style={{ background: categoryColors[blog.category] }}
                                    >
                                        {blog.category}
                                    </span>
                                    <h3 className="font-bold text-lg mb-2 text-gray-800 leading-tight">
                                        {blog.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">{blog.desc}</p>
                                </div>
                            </div>
                        ))}
                </div>
                {/* Right Column */}
                <div className="flex flex-col gap-8">
                    {blogs
                        .filter((_, i) => i % 2 === 1)
                        .map((blog) => (
                            <div
                                key={blog.id}
                                className="flex bg-[#F8FAFC] rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                            >
                                <div className="relative w-48 min-w-[192px] h-48">
                                    <img
                                        src={blog.image}
                                        alt={blog.title}
                                        className="object-cover w-full h-full"
                                    />
                                    <div className="absolute top-3 left-3 bg-white rounded-xl px-4 py-2 flex flex-col items-center shadow-md">
                                        <span className="text-blue-700 font-bold text-xl leading-none">
                                            {blog.date.day}
                                        </span>
                                        <span className="text-gray-500 text-sm">{blog.date.month}</span>
                                    </div>
                                </div>
                                <div className="flex flex-col justify-center px-6 py-4">
                                    <span
                                        className="inline-block mb-3 px-3 py-1 rounded-full text-white text-xs font-semibold"
                                        style={{ background: categoryColors[blog.category] }}
                                    >
                                        {blog.category}
                                    </span>
                                    <h3 className="font-bold text-lg mb-2 text-gray-800 leading-tight">
                                        {blog.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">{blog.desc}</p>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
            <button className="mt-12 bg-blue-900 text-white px-8 py-3 rounded-full font-semibold flex items-center gap-2 hover:bg-blue-800 transition-colors duration-300 shadow-lg hover:shadow-xl">
                View All Articles
                <svg
                    className="w-5 h-5 ml-1"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 5l7 7-7 7"
                    />
                </svg>
            </button>
        </div>
    );
}