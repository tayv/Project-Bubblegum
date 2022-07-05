import LayoutContainerSide from '@components/layout/LayoutContainerSide'
import Breadcrumbs from '@components/layout/Breadcrumbs'
import Heading from '@components/layout/Heading'
import Paragraph from '@components/layout/Paragraph'
import {FC} from 'react'

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

const QuizTemplate: FC = () => (

<>
  <LayoutContainerSide>
  <Breadcrumbs crumbs={crumbs} />
  <Heading text="Quiz Template" size="h1" type="primary"/>
  <Paragraph text="This is a template to test form layout and start building out state and database behavior." size="standard" type="primary" />
  <br />
  <hr />


  </LayoutContainerSide>
</>
)

export default QuizTemplate
