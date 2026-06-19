import { ComponentConfig } from '@puckeditor/core'
import ProjectListBlock, { ProjectListProps } from '../components/project-list-block'


export const ProjectListBlockConfig: ComponentConfig<ProjectListProps> = {
  fields: {
    title: {
      type: 'text'
    },

    limit: {
      type: 'number'
    }
  },

  render: ProjectListBlock
}