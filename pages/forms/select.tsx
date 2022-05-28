import Breadcrumbs from '@components/Breadcrumbs'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

export default () => (
<>
  <Breadcrumbs></Breadcrumbs>

  <DropdownMenu.Root>

    <DropdownMenu.Trigger>Settings</DropdownMenu.Trigger> 
    <DropdownMenu.Content>

      <DropdownMenu.Label>This is a label</DropdownMenu.Label>

      <DropdownMenu.Item>This is an item</DropdownMenu.Item>
      <DropdownMenu.Group>

        <DropdownMenu.Item>Another item</DropdownMenu.Item>

      </DropdownMenu.Group>

    </DropdownMenu.Content>

  </DropdownMenu.Root>

</>
);
