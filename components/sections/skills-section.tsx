import { Badge } from "@/components/ui/badge";

const skillCategories = [
  {
    title: "Frontend",
    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "Vue.js",
      "TailwindCSS",
      "HTML/CSS",
      "JavaScript",
    ],
  },
  {
    title: "Backend",
    skills: [
      "Node.js",
      "Express",
      "Python",
      "Django",
      "GraphQL",
      "REST APIs",
      "PostgreSQL",
      "MongoDB",
    ],
  },
  {
    title: "Tools & Others",
    skills: [
      "Git",
      "Docker",
      "AWS",
      "Vercel",
      "Figma",
      "Jest",
      "CI/CD",
      "Agile",
    ],
  },
];

export function SkillsSection() {
  return (
    <section id="skills" className="container py-24 md:py-32">
      <div className="mx-auto max-w-[980px]">
        <div className="flex flex-col items-center gap-4 text-center">
          <h2 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:text-6xl">
            Skills & Technologies
          </h2>
          <p className="max-w-[750px] text-lg text-muted-foreground sm:text-xl">
            Technologies and tools I work with to bring ideas to life.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {skillCategories.map((category) => (
            <div key={category.title}>
              <h3 className="mb-4 text-xl font-semibold">{category.title}</h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
