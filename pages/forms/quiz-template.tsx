import Breadcrumbs from '@components/layout/Breadcrumbs'
import LayoutContainerSide from '@components/layout/LayoutContainerSide';


// data for Breadcrumbs
const crumbs = [
  {
    text: "Home", 
    path: "/",
    currentPg: false,
  }, {
    text: "Quiz Template", 
    path: "/",
    currentPg: true,
  }
]

export default () => (

<>
  <LayoutContainerSide>
  <Breadcrumbs crumbs={crumbs} />
  <br></br>

    Nothing here
  </LayoutContainerSide>
</>
);
