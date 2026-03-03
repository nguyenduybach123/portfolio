import { Card, CardContent } from "@/components/ui/card";
import { Code, Palette, Zap } from "lucide-react";

export function AboutSection() {
  return (
    <section id="about" className="container py-24 md:py-32">
      <div className="mx-auto max-w-[980px]">
        <div className="flex flex-col items-center gap-4 text-center">
          <h2 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:text-6xl">
            About Me
          </h2>
          <p className="max-w-[750px] text-lg text-muted-foreground sm:text-xl">
            I'm a passionate developer with a keen eye for design and a love for
            creating seamless user experiences.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardContent className="flex flex-col items-center gap-4 pt-6">
              <div className="rounded-full bg-primary/10 p-4">
                <Code className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Clean Code</h3>
              <p className="text-center text-muted-foreground">
                Writing maintainable, scalable, and efficient code is my top
                priority.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex flex-col items-center gap-4 pt-6">
              <div className="rounded-full bg-primary/10 p-4">
                <Palette className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Great Design</h3>
              <p className="text-center text-muted-foreground">
                Creating beautiful interfaces that users love to interact with.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex flex-col items-center gap-4 pt-6">
              <div className="rounded-full bg-primary/10 p-4">
                <Zap className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Performance</h3>
              <p className="text-center text-muted-foreground">
                Optimizing for speed and efficiency to deliver the best user
                experience.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-16">
          <p className="text-lg leading-relaxed text-muted-foreground">
            With over X years of experience in web development, I specialize in
            building modern web applications using cutting-edge technologies like
            React, Next.js, TypeScript, and Node.js. I'm constantly learning and
            exploring new technologies to stay at the forefront of web
            development.
          </p>
        </div>
      </div>
    </section>
  );
}
