export const useBreadcrumb = () => {
  const currentTitle = useState<string | null>(
    'breadcrumb-current-title',
    () => null
  )
  return { currentTitle }
}
