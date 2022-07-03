import Breadcrumbs from '@components/layout/Breadcrumbs'
import LayoutContainerSide from '@components/layout/LayoutContainerSide';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

// data for Breadcrumbs
const crumbs = [
  {
    text: "Home", 
    path: "/",
    active: false,
  }, {
    text: "Select", 
    path: "/",
    active: true,
  }
]

export default () => (

<>
  <LayoutContainerSide>
  <Breadcrumbs crumbs={crumbs} />
  <br></br>

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
  </LayoutContainerSide>
</>
);
