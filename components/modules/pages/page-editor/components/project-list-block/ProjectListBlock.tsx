import { PuckComponent } from "@puckeditor/core"

export interface ProjectListProps {
  title: string
  limit: number
}

const ProjectListBlock: PuckComponent<ProjectListProps> = ({
  title,
  limit
}: ProjectListProps) => {
  return (
    <section>
      <h2>{title}</h2>

      <div>
        Dynamic projects here...

        Limit: {limit}
      </div>
    </section>
  )
}

export default ProjectListBlock