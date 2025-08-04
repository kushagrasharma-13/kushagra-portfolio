import experiences from '@/data/experience.json';
import ExperienceCard from '@/components/ui/ExperienceCard';

export default function ExperiencePage() {
    return (
        <section className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-extrabold mb-12 text-center text-white">Work Experience</h1>
            <div className="relative border-l-2 border-gray-700">
                {experiences.map((exp) => (
                    // The data for each card is sourced from your documents [cite: 4-29]
                    <ExperienceCard key={exp.id} experience={exp} />
                ))}
            </div>
        </section>
    );
}