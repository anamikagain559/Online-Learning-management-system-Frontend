// app/about/page.tsx
import Image from "next/image";

export default function AboutPage() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-12 space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold">About Our Project</h1>
        <p className="text-gray-600 text-lg">
          Learn more about our mission, vision, and the team behind this project.
        </p>
      </section>

      {/* About Us Section */}
      <section className="flex flex-col md:flex-row items-center gap-8">
        <div className="md:w-1/2">
          <h2 className="text-2xl font-semibold mb-4">Who We Are</h2>
          <p className="text-gray-700">
            Our project aims to provide an intuitive and efficient platform for users
            to manage their tasks seamlessly. We focus on performance, user experience,
            and modern technologies to deliver the best solution.
          </p>
        </div>
        <div className="md:w-1/2">
          <Image
            src="/about-image.jpg" // replace with your image path
            alt="About Us"
            width={600}
            height={400}
            className="rounded-lg shadow-lg"
          />
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="grid md:grid-cols-2 gap-12">
        <div className="bg-gray-100 p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
          <p className="text-gray-700">
            To create a user-friendly and reliable platform that empowers people
            to organize, track, and achieve their goals efficiently.
          </p>
        </div>
        <div className="bg-gray-100 p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-2">Our Vision</h3>
          <p className="text-gray-700">
            To become a leading solution in task management, making productivity
            simple and accessible for everyone.
          </p>
        </div>
      </section>

      {/* Team Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-6 text-center">Meet the Team</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { name: "Anamika Gain", role: "Founder & Developer", img: "/team1.jpg" },
            { name: "Debabrota Gain", role: "Co-Founder", img: "/team2.jpg" },
            { name: "John Doe", role: "UI/UX Designer", img: "/team3.jpg" },
            { name: "Jane Smith", role: "Backend Developer", img: "/team4.jpg" },
          ].map((member) => (
            <div key={member.name} className="text-center">
              <Image
                src={member.img}
                alt={member.name}
                width={150}
                height={150}
                className="rounded-full mx-auto mb-2"
              />
              <h4 className="font-semibold">{member.name}</h4>
              <p className="text-gray-600 text-sm">{member.role}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
