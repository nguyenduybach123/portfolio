# Timeline Component Documentation

A flexible and fully-featured Timeline component built with NextJS, TailwindCSS, Framer Motion, and Shadcn/UI principles.

## Features

- ✨ Multiple variants (default, outlined, dashed)
- 🎨 Color themes (default, primary, success, warning, error, info)
- 📍 Position layouts (left, right, alternate)
- 🎭 Smooth scroll animations with Framer Motion
- 🎯 Customizable dots with icons
- 📱 Fully responsive
- ♿ Accessible
- 🎨 TypeScript support

## Installation

The component is already integrated into your project. No additional installation needed.

## Basic Usage

### Simple Timeline (Left Aligned)

```tsx
import Timeline from '@/components/shared/timeline'
import { Briefcase } from 'lucide-react'

export default function ExperienceTimeline() {
  return (
    <Timeline>
      <Timeline.Item>
        <Timeline.Separator>
          <Timeline.Dot icon={Briefcase} />
          <Timeline.Connector />
        </Timeline.Separator>
        <Timeline.Content>
          <h3 className="font-semibold">Senior Frontend Developer</h3>
          <p className="text-sm text-muted-foreground">Company Name • 2023 - Present</p>
          <p className="mt-2">Built scalable web applications using React and Next.js</p>
        </Timeline.Content>
      </Timeline.Item>

      <Timeline.Item>
        <Timeline.Separator>
          <Timeline.Dot icon={Briefcase} />
          <Timeline.Connector />
        </Timeline.Separator>
        <Timeline.Content>
          <h3 className="font-semibold">Frontend Developer</h3>
          <p className="text-sm text-muted-foreground">Previous Company • 2021 - 2023</p>
          <p className="mt-2">Developed responsive user interfaces</p>
        </Timeline.Content>
      </Timeline.Item>

      <Timeline.Item>
        <Timeline.Separator>
          <Timeline.Dot icon={Briefcase} />
        </Timeline.Separator>
        <Timeline.Content>
          <h3 className="font-semibold">Junior Developer</h3>
          <p className="text-sm text-muted-foreground">First Company • 2019 - 2021</p>
          <p className="mt-2">Started career in web development</p>
        </Timeline.Content>
      </Timeline.Item>
    </Timeline>
  )
}
```

### Alternate Layout with Colors

```tsx
import Timeline from '@/components/shared/timeline'
import { GraduationCap, Award, Trophy } from 'lucide-react'

export default function EducationTimeline() {
  return (
    <Timeline position="alternate" color="primary">
      <Timeline.Item>
        <Timeline.OppositeContent>
          <p className="text-sm">2023</p>
        </Timeline.OppositeContent>
        <Timeline.Separator>
          <Timeline.Dot icon={Trophy} color="success" />
          <Timeline.Connector />
        </Timeline.Separator>
        <Timeline.Content variant="card">
          <h3 className="font-semibold">Master's Degree</h3>
          <p className="text-sm text-muted-foreground">Computer Science</p>
        </Timeline.Content>
      </Timeline.Item>

      <Timeline.Item>
        <Timeline.OppositeContent>
          <p className="text-sm">2021</p>
        </Timeline.OppositeContent>
        <Timeline.Separator>
          <Timeline.Dot icon={Award} color="primary" />
          <Timeline.Connector />
        </Timeline.Separator>
        <Timeline.Content variant="card">
          <h3 className="font-semibold">Certification</h3>
          <p className="text-sm text-muted-foreground">AWS Certified Developer</p>
        </Timeline.Content>
      </Timeline.Item>

      <Timeline.Item>
        <Timeline.OppositeContent>
          <p className="text-sm">2019</p>
        </Timeline.OppositeContent>
        <Timeline.Separator>
          <Timeline.Dot icon={GraduationCap} color="info" />
        </Timeline.Separator>
        <Timeline.Content variant="card">
          <h3 className="font-semibold">Bachelor's Degree</h3>
          <p className="text-sm text-muted-foreground">Software Engineering</p>
        </Timeline.Content>
      </Timeline.Item>
    </Timeline>
  )
}
```

### Right-Aligned Timeline

```tsx
import Timeline from '@/components/shared/timeline'
import { Star } from 'lucide-react'

export default function AchievementsTimeline() {
  return (
    <Timeline position="right" color="warning">
      <Timeline.Item>
        <Timeline.Separator>
          <Timeline.Dot icon={Star} size="lg" />
          <Timeline.Connector />
        </Timeline.Separator>
        <Timeline.Content>
          <h3 className="font-semibold">First Achievement</h3>
          <p className="mt-2">Description of your achievement</p>
        </Timeline.Content>
      </Timeline.Item>
    </Timeline>
  )
}
```

### Custom Dot Variants

```tsx
import Timeline from '@/components/shared/timeline'
import { CheckCircle } from 'lucide-react'

export default function StatusTimeline() {
  return (
    <Timeline>
      {/* Filled Dot */}
      <Timeline.Item>
        <Timeline.Separator>
          <Timeline.Dot icon={CheckCircle} variant="filled" color="success" />
          <Timeline.Connector />
        </Timeline.Separator>
        <Timeline.Content>Completed Task</Timeline.Content>
      </Timeline.Item>

      {/* Outlined Dot */}
      <Timeline.Item>
        <Timeline.Separator>
          <Timeline.Dot icon={CheckCircle} variant="outlined" color="primary" />
          <Timeline.Connector />
        </Timeline.Separator>
        <Timeline.Content>In Progress</Timeline.Content>
      </Timeline.Item>

      {/* Soft Dot */}
      <Timeline.Item>
        <Timeline.Separator>
          <Timeline.Dot icon={CheckCircle} variant="soft" color="default" />
        </Timeline.Separator>
        <Timeline.Content>Pending</Timeline.Content>
      </Timeline.Item>
    </Timeline>
  )
}
```

### With Dashed Connector

```tsx
import Timeline from '@/components/shared/timeline'
import { Clock } from 'lucide-react'

export default function ProcessTimeline() {
  return (
    <Timeline color="info">
      <Timeline.Item>
        <Timeline.Separator>
          <Timeline.Dot icon={Clock} />
          <Timeline.Connector variant="dashed" />
        </Timeline.Separator>
        <Timeline.Content>Step 1: Planning</Timeline.Content>
      </Timeline.Item>

      <Timeline.Item>
        <Timeline.Separator>
          <Timeline.Dot icon={Clock} />
          <Timeline.Connector variant="dashed" />
        </Timeline.Separator>
        <Timeline.Content>Step 2: Development</Timeline.Content>
      </Timeline.Item>

      <Timeline.Item>
        <Timeline.Separator>
          <Timeline.Dot icon={Clock} />
        </Timeline.Separator>
        <Timeline.Content>Step 3: Launch</Timeline.Content>
      </Timeline.Item>
    </Timeline>
  )
}
```

### Without Animations

```tsx
import Timeline from '@/components/shared/timeline'
import { Zap } from 'lucide-react'

export default function StaticTimeline() {
  return (
    <Timeline>
      <Timeline.Item animate={false}>
        <Timeline.Separator>
          <Timeline.Dot icon={Zap} animate={false} />
          <Timeline.Connector animate={false} />
        </Timeline.Separator>
        <Timeline.Content animate={false}>
          Static content without animations
        </Timeline.Content>
      </Timeline.Item>
    </Timeline>
  )
}
```

## API Reference

### Timeline Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Timeline items |
| `variant` | `'default' \| 'outlined' \| 'dashed'` | `'default'` | Timeline style variant |
| `position` | `'left' \| 'right' \| 'alternate'` | `'left'` | Position of timeline content |
| `color` | `'default' \| 'primary' \| 'success' \| 'warning' \| 'error' \| 'info'` | `'default'` | Default color theme |
| `className` | `string` | - | Additional CSS classes |

### Timeline.Item Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Item content |
| `animate` | `boolean` | `true` | Enable entrance animation |
| `position` | `'left' \| 'right'` | From context | Override position for this item |
| `className` | `string` | - | Additional CSS classes |

### Timeline.Dot Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `icon` | `LucideIcon` | - | Icon component from lucide-react |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Dot size |
| `color` | `TimelineColor` | From context | Dot color |
| `variant` | `'filled' \| 'outlined' \| 'soft'` | `'filled'` | Dot style |
| `animate` | `boolean` | `true` | Enable entrance animation |
| `children` | `ReactNode` | - | Custom content inside dot |
| `className` | `string` | - | Additional CSS classes |

### Timeline.Connector Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `color` | `TimelineColor` | From context | Connector color |
| `animate` | `boolean` | `true` | Enable scroll-based animation |
| `variant` | `'solid' \| 'dashed' \| 'dotted'` | `'solid'` | Connector line style |
| `className` | `string` | - | Additional CSS classes |

### Timeline.Content Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Content |
| `animate` | `boolean` | `true` | Enable entrance animation |
| `variant` | `'default' \| 'card'` | `'default'` | Content style (card adds border/shadow) |
| `className` | `string` | - | Additional CSS classes |

### Timeline.OppositeContent Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Content |
| `animate` | `boolean` | `true` | Enable entrance animation |
| `className` | `string` | - | Additional CSS classes |

### Timeline.Separator Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Separator content (usually Dot and Connector) |
| `className` | `string` | - | Additional CSS classes |

## Styling

The component uses Tailwind CSS and respects your theme configuration. Colors are based on:

- **default**: Gray tones
- **primary**: Your theme's primary color
- **success**: Green (`green-500`)
- **warning**: Yellow (`yellow-500`)
- **error**: Red (`red-500`)
- **info**: Blue (`blue-500`)

## Best Practices

1. **Always end with a Dot**: The last `Timeline.Item` should not have a `Timeline.Connector`
2. **Use semantic icons**: Choose icons that represent the content (Briefcase for work, GraduationCap for education, etc.)
3. **Keep content concise**: Timeline items work best with brief, scannable content
4. **Use variant="card"**: For more emphasis on content items
5. **OppositeContent**: Use for dates or secondary information in alternate layouts

## Accessibility

- Semantic HTML structure
- Proper color contrast ratios
- Animation respects `prefers-reduced-motion`
- Keyboard navigable

## TypeScript

All components are fully typed with TypeScript. Import types if needed:

```tsx
import type { TimelineColor, TimelinePosition, TimelineVariant } from '@/components/shared/timeline/lib/constants'
```
