import { createFileRoute } from '@tanstack/react-router'

import { HomePage } from '#/components/ui/pages/home-page'

// Screenshots are off until Vera's shots are final: every slot shows the kit's
// pending placeholder and no file is requested. Drop the prop to turn them on;
// with no assetBase they load from this site's own public/screenshots.
export const Route = createFileRoute('/')({ component: () => <HomePage screenshots={false} /> })
