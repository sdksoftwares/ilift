import { DocumentActionComponent, DocumentActionsContext } from 'sanity'

export function resolveDocumentActions(prev: DocumentActionComponent[], context: DocumentActionsContext) {
    // 1. Identify key actions
    const publishAction = prev.find((action) => action.action === 'publish')
    const deleteAction = prev.find((action) => action.action === 'delete')
    const discardAction = prev.find((action) => action.action === 'discardChanges')
    const unpublishAction = prev.find((action) => action.action === 'unpublish')

    // Filter out the ones we found so we don't duplicate
    const otherActions = prev.filter(
        (action) =>
            action.action !== 'publish' &&
            action.action !== 'delete' &&
            action.action !== 'discardChanges' &&
            action.action !== 'unpublish'
    )

    // 2. Create custom "View Live" action
    const ViewLiveAction: DocumentActionComponent = (props) => {
        return {
            label: 'View Live (Website)',
            onHandle: () => {
                const doc = props.draft || props.published
                if (!doc) return

                // Determine URL based on type
                // This is a basic implementation; exact paths might need adjustment
                let href = '/'
                if (doc._type === 'product' && doc.slug && (doc.slug as any).current) {
                    href = `/products/${(doc.slug as any).current}`
                } else if (doc._type === 'resource') {
                    // Resources might not have a dedicated page, but we can point to a list or similar
                    href = '/i-school'
                }

                window.open(href, '_blank')
            },
            shortcut: 'Ctrl+Alt+V'
        }
    }

    // 3. Return reordered actions
    // We place Delete explicitly to ensure it's visible (e.g., in the secondary menu or main list)
    // Sanity often groups "destructive" actions, but let's try to put it early.

    return [
        // Primary: Publish
        ...(publishAction ? [publishAction] : []),
        // Custom: View Live
        ViewLiveAction,
        // Destructive/Important: Delete (Making it 3rd might keep it visible or put it at top of "...")
        ...(deleteAction ? [deleteAction] : []),
        // State: Discard / Unpublish
        ...(discardAction ? [discardAction] : []),
        ...(unpublishAction ? [unpublishAction] : []),
        // Others
        ...otherActions,
    ]
}
