import type { ProjectInput } from '../types/project.ts'
import { projectRepository } from '../repositories/projectRepository.ts'

export const projectService = {
  list: () => projectRepository.findAll(),
  get: (id: number) => projectRepository.findById(id),
  create: (input: ProjectInput) => projectRepository.create(input),
  update: ({ id, ...input }: ProjectInput & { id: number }) => projectRepository.update(id, input),
}
