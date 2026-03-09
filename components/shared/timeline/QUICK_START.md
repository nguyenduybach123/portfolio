# Timeline Component - Quick Reference

## Basic Structure

```tsx
<Timeline>
  <Timeline.Item>
    <Timeline.Separator>
      <Timeline.Dot />
      <Timeline.Connector />
    </Timeline.Separator>
    <Timeline.Content>
      Your content here
    </Timeline.Content>
  </Timeline.Item>
</Timeline>
```

## Props Cheat Sheet

### Timeline
- `position`: `'left'` | `'right'` | `'alternate'` (default: `'left'`)
- `color`: `'default'` | `'primary'` | `'success'` | `'warning'` | `'error'` | `'info'`
- `variant`: `'default'` | `'outlined'` | `'dashed'`

### Timeline.Dot
- `icon`: Lucide icon component
- `size`: `'sm'` | `'md'` | `'lg'` (default: `'md'`)
- `color`: Same as Timeline color options
- `variant`: `'filled'` | `'outlined'` | `'soft'` (default: `'filled'`)
- `animate`: `boolean` (default: `true`)

### Timeline.Connector
- `color`: Same as Timeline color options
- `variant`: `'solid'` | `'dashed'` | `'dotted'` (default: `'solid'`)
- `animate`: `boolean` (default: `true`)

### Timeline.Content
- `variant`: `'default'` | `'card'` (default: `'default'`)
- `animate`: `boolean` (default: `true`)

### Timeline.OppositeContent
- Use with `position="alternate"` for dates/metadata
- `animate`: `boolean` (default: `true`)

## Common Patterns

### Left-Aligned Experience
```tsx
<Timeline position="left" color="primary">
  <Timeline.Item>
    <Timeline.Separator>
      <Timeline.Dot icon={Briefcase} />
      <Timeline.Connector />
    </Timeline.Separator>
    <Timeline.Content variant="card">
      <h3>Job Title</h3>
      <p>Company • Date</p>
    </Timeline.Content>
  </Timeline.Item>
</Timeline>
```

### Alternate Education
```tsx
<Timeline position="alternate">
  <Timeline.Item>
    <Timeline.OppositeContent>
      <p>2023</p>
    </Timeline.OppositeContent>
    <Timeline.Separator>
      <Timeline.Dot icon={GraduationCap} />
      <Timeline.Connector />
    </Timeline.Separator>
    <Timeline.Content variant="card">
      <h3>Degree</h3>
    </Timeline.Content>
  </Timeline.Item>
</Timeline>
```

### Status with Colors
```tsx
<Timeline>
  <Timeline.Item>
    <Timeline.Separator>
      <Timeline.Dot color="success" icon={CheckCircle} />
      <Timeline.Connector />
    </Timeline.Separator>
    <Timeline.Content>Completed</Timeline.Content>
  </Timeline.Item>
  
  <Timeline.Item>
    <Timeline.Separator>
      <Timeline.Dot color="primary" icon={Clock} />
      <Timeline.Connector />
    </Timeline.Separator>
    <Timeline.Content>In Progress</Timeline.Content>
  </Timeline.Item>
  
  <Timeline.Item>
    <Timeline.Separator>
      <Timeline.Dot color="default" variant="outlined" />
    </Timeline.Separator>
    <Timeline.Content>Pending</Timeline.Content>
  </Timeline.Item>
</Timeline>
```

## Tips

1. **Last Item**: Remove `<Timeline.Connector />` from the last item
2. **Card Variant**: Use `variant="card"` for emphasized content
3. **Colors**: Match dot colors to content status/importance
4. **Icons**: Import from `lucide-react`
5. **Animations**: Set `animate={false}` to disable for performance
6. **Opposite Content**: Great for dates in alternate layouts

## Import

```tsx
import Timeline from '@/components/shared/timeline'
import { Icon1, Icon2 } from 'lucide-react'
```
