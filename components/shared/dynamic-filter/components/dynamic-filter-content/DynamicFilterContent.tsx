import { FC, ReactNode } from "react"
import { useDynamicFilterContext } from "../../lib/hooks"

interface Props {
    children: ReactNode
}

const DynamicFilterContent: FC<Props> = (props) => {
    // Props
    const { children } = props  

    // Hooks
    const  { form, onSubmit } = useDynamicFilterContext()

  return (
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4' noValidate>
            {children}
          </form>
  )
}

export default DynamicFilterContent