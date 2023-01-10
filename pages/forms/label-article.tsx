import LayoutContainerSide from '@components/layout/LayoutContainerSide'
import Breadcrumbs from '@components/layout/Breadcrumbs'
import Heading from '@components/layout/Heading'
import Paragraph from '@components/layout/Paragraph'
import { FC } from 'react'
import Section from '@components/layout/Section'
import InputLabel from '@components/atoms/InputLabelRadix'


// data for Breadcrumbs
const crumbs = [
  {
    text: "Home", 
    path: "/",
    currentPg: false,
  }, {
    text: "Label", 
    path: "/",
    currentPg: true,
  }
]

const LabelArticle: FC = () => {

  return (
  <>
    <LayoutContainerSide>
      <Breadcrumbs crumbs={crumbs} />
      <Heading text="Label" size="h1" type="primary"/>
      <Paragraph text="On this page you'll find label components." size="standard" type="primary" />
      <br />
      <hr />
      <Section id="header" style="standard">
        <Heading text="Input Label" size="h3" type="primary"/>
          <Paragraph 
            text="
              The label component should be used with every input component (or input group). It's build using Radix UI's label primitive.
              The intent is to have each input component have the label component built in so you just need to pass a label prop.         " 
            size="standard" 
            type="primary" 
          />
          <br/>
          <Paragraph 
            text="The label component supports two styles: 'standard' and 'inline'. The inline style is used in the Checkbox component." 
            size="standard" 
            type="primary" 
          />
         <br/>
         <InputLabel type="standard" label="Example label: Standard" htmlFor="" />
      </Section>

    </LayoutContainerSide>

  </>
  )
}
export default LabelArticle
