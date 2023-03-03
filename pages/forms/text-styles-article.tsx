import LayoutContainerSide from '@components/layout/LayoutContainerSide'
import Breadcrumbs from '@components/layout/Breadcrumbs'
import Heading from '@components/layout/Heading'
import Paragraph from '@components/layout/Paragraph'
import { FC } from 'react'
import Section from '@components/layout/Section'
import Divider from '@components/layout/Divider'
import BlankSpace from '@components/layout/BlankSpace'

// data for Breadcrumbs
const crumbs = [
  {
    text: "Home", 
    path: "/",
    currentPg: false,
  }, {
    text: "Text Styles", 
    path: "/",
    currentPg: true,
  }
]

const TextStylesArticle: FC = () => {

  return (
  <>
    <LayoutContainerSide>
      <Breadcrumbs crumbs={crumbs} />
      <Heading text="Text Styles" size="h1" type="primary"/>
      <Paragraph>On this page you'll find text components.</Paragraph>

      <Section id="header" style="standard">
        <Heading text="Heading Component" size="h3" type="primary"/>
          <Paragraph>
{`The Heading component is used to standardize header text in the app. It has two props: size and type. 

The size prop has four variations: h1, h2, h3 and h4 as well as two type props: primary and secondary. It currently requires special characters to be escaped and cannot be passed links.`}
          </Paragraph>

          <Divider padding="xl" />

          <Heading text="Example: Size Prop Variations" size="h4" type="primary"/>
          <Heading text="This is an h1 heading" size="h1" type="primary"/>
          <Heading text="This is an h2 heading" size="h2" type="primary"/>
          <Heading text="This is an h3 heading" size="h3" type="primary"/>
          <Heading text="This is an h4 heading" size="h4" type="primary"/>

          <br/>
          <Heading text="Example: Style Prop Variations" size="h4" type="primary"/>
          <Heading text="This is a primary style heading" size="h4" type="primary"/>
          <Heading text="This is a secondary style heading" size="h4" type="secondary"/>

      </Section>

      <Section id="header" style="standard">
        <Heading text="Paragraph Component" size="h3" type="primary"/>
          <Paragraph>
{`The Paragraph component is used to standardize body text in the app. Currently it has four optional props: size, style, space, and className. 

Text is passed as child element and can use template literals for dynamic or text needing line breaks. If you need to style text you can pass JSX instead.

If you pass custom css via the className prop you can pass override to size, style, or space props to remove the default styles.
`}
          </Paragraph>

          <Divider padding="xl" />

          <Heading text="Examples: Style Prop Variations" size="h4" type="primary"/>
          <Paragraph style="primary">This paragraph uses the primary style.</Paragraph>
          <Paragraph style="secondary">This paragraph uses the secondary style.</Paragraph>

          <Divider padding="xl" />
          
          <Heading text="Examples: Size Prop Variations" size="h4" type="primary"/>

          <Heading text="size = xsmall" size="h4" type="secondary"/>
          <Paragraph size="xsmall">
            {`Topping liquorice bear claw cake cake dessert sweet. Macaroon jujubes marshmallow tart lollipop oat cake cotton candy. Candy gingerbread topping cake wafer chupa chups chocolate cake icing bonbon. Brownie danish powder macaroon brownie toffee chocolate. Cupcake macaroon dessert tart jujubes powder. Fruitcake chocolate bar tiramisu wafer soufflé pie dessert jelly beans bear claw.`}
          </Paragraph>
          <BlankSpace ySize="standard" />

          <Heading text="size = small" size="h4" type="secondary"/>
          <Paragraph size="small">
            {`Topping liquorice bear claw cake cake dessert sweet. Macaroon jujubes marshmallow tart lollipop oat cake cotton candy. Candy gingerbread topping cake wafer chupa chups chocolate cake icing bonbon. Brownie danish powder macaroon brownie toffee chocolate. Cupcake macaroon dessert tart jujubes powder. Fruitcake chocolate bar tiramisu wafer soufflé pie dessert jelly beans bear claw.`}
          </Paragraph>
          <BlankSpace ySize="standard" />

          <Heading text="size = standard" size="h4" type="secondary"/>
          <Paragraph size="standard">
            {`Topping liquorice bear claw cake cake dessert sweet. Macaroon jujubes marshmallow tart lollipop oat cake cotton candy. Candy gingerbread topping cake wafer chupa chups chocolate cake icing bonbon. Brownie danish powder macaroon brownie toffee chocolate. Cupcake macaroon dessert tart jujubes powder. Fruitcake chocolate bar tiramisu wafer soufflé pie dessert jelly beans bear claw.`}
          </Paragraph>

          <BlankSpace ySize="standard" />
          <Heading text="size = large" size="h4" type="secondary"/>
          <Paragraph size="large">
            {`Topping liquorice bear claw cake cake dessert sweet. Macaroon jujubes marshmallow tart lollipop oat cake cotton candy. Candy gingerbread topping cake wafer chupa chups chocolate cake icing bonbon. Brownie danish powder macaroon brownie toffee chocolate. Cupcake macaroon dessert tart jujubes powder. Fruitcake chocolate bar tiramisu wafer soufflé pie dessert jelly beans bear claw.`}
          </Paragraph>
          <BlankSpace ySize="standard" />

          <Heading text="size = xlarge" size="h4" type="secondary"/>
          <Paragraph size="xlarge">
            {`Topping liquorice bear claw cake cake dessert sweet. Macaroon jujubes marshmallow tart lollipop oat cake cotton candy. Candy gingerbread topping cake wafer chupa chups chocolate cake icing bonbon. Brownie danish powder macaroon brownie toffee chocolate. Cupcake macaroon dessert tart jujubes powder. Fruitcake chocolate bar tiramisu wafer soufflé pie dessert jelly beans bear claw.`}
          </Paragraph>
          <BlankSpace ySize="standard" />

          <Heading text="size = xxlarge" size="h4" type="secondary"/>
          <Paragraph size="xxlarge">
            {`Topping liquorice bear claw cake cake dessert sweet. Macaroon jujubes marshmallow tart lollipop oat cake cotton candy. Candy gingerbread topping cake wafer chupa chups chocolate cake icing bonbon. Brownie danish powder macaroon brownie toffee chocolate. Cupcake macaroon dessert tart jujubes powder. Fruitcake chocolate bar tiramisu wafer soufflé pie dessert jelly beans bear claw.`}
          </Paragraph>
          <BlankSpace ySize="standard" />

          <Heading text="size = xxxlarge" size="h4" type="secondary"/>
          <Paragraph size="xxxlarge">
            {`Topping liquorice bear claw cake cake dessert sweet. Macaroon jujubes marshmallow tart lollipop oat cake cotton candy. Candy gingerbread topping cake wafer chupa chups chocolate cake icing bonbon. Brownie danish powder macaroon brownie toffee chocolate. Cupcake macaroon dessert tart jujubes powder. Fruitcake chocolate bar tiramisu wafer soufflé pie dessert jelly beans bear claw.`}
          </Paragraph>
          <BlankSpace ySize="standard" />

          <Divider padding="xl" />

          <Heading text="Examples: Space Prop Variations" size="h4" type="primary"/>

          <Heading text="space = tight" size="h4" type="secondary"/>
          <Paragraph space="tight">
            {`Topping liquorice bear claw cake cake dessert sweet. Macaroon jujubes marshmallow tart lollipop oat cake cotton candy. Candy gingerbread topping cake wafer chupa chups chocolate cake icing bonbon. Brownie danish powder macaroon brownie toffee chocolate. Cupcake macaroon dessert tart jujubes powder. Fruitcake chocolate bar tiramisu wafer soufflé pie dessert jelly beans bear claw.`}
          </Paragraph>
          <BlankSpace ySize="standard" />

          <Heading text="space = snug" size="h4" type="secondary"/>
          <Paragraph space="snug">
            {`Topping liquorice bear claw cake cake dessert sweet. Macaroon jujubes marshmallow tart lollipop oat cake cotton candy. Candy gingerbread topping cake wafer chupa chups chocolate cake icing bonbon. Brownie danish powder macaroon brownie toffee chocolate. Cupcake macaroon dessert tart jujubes powder. Fruitcake chocolate bar tiramisu wafer soufflé pie dessert jelly beans bear claw.`}
          </Paragraph>
          <BlankSpace ySize="standard" />

          <Heading text="space = normal" size="h4" type="secondary"/>
          <Paragraph space="normal">
            {`Topping liquorice bear claw cake cake dessert sweet. Macaroon jujubes marshmallow tart lollipop oat cake cotton candy. Candy gingerbread topping cake wafer chupa chups chocolate cake icing bonbon. Brownie danish powder macaroon brownie toffee chocolate. Cupcake macaroon dessert tart jujubes powder. Fruitcake chocolate bar tiramisu wafer soufflé pie dessert jelly beans bear claw.`}
          </Paragraph>
          <BlankSpace ySize="standard" />

          <Heading text="space = relaxed" size="h4" type="secondary"/>
          <Paragraph space="relaxed">
            {`Topping liquorice bear claw cake cake dessert sweet. Macaroon jujubes marshmallow tart lollipop oat cake cotton candy. Candy gingerbread topping cake wafer chupa chups chocolate cake icing bonbon. Brownie danish powder macaroon brownie toffee chocolate. Cupcake macaroon dessert tart jujubes powder. Fruitcake chocolate bar tiramisu wafer soufflé pie dessert jelly beans bear claw.`}
          </Paragraph>
          <BlankSpace ySize="standard" />

          <Heading text="space = loose" size="h4" type="secondary"/>
          <Paragraph space="loose">
            {`Topping liquorice bear claw cake cake dessert sweet. Macaroon jujubes marshmallow tart lollipop oat cake cotton candy. Candy gingerbread topping cake wafer chupa chups chocolate cake icing bonbon. Brownie danish powder macaroon brownie toffee chocolate. Cupcake macaroon dessert tart jujubes powder. Fruitcake chocolate bar tiramisu wafer soufflé pie dessert jelly beans bear claw.`}
          </Paragraph>
          <BlankSpace ySize="standard" />

          <Heading text="space = none" size="h4" type="secondary"/>
          <Paragraph space="none">
            {`Topping liquorice bear claw cake cake dessert sweet. Macaroon jujubes marshmallow tart lollipop oat cake cotton candy. Candy gingerbread topping cake wafer chupa chups chocolate cake icing bonbon. Brownie danish powder macaroon brownie toffee chocolate. Cupcake macaroon dessert tart jujubes powder. Fruitcake chocolate bar tiramisu wafer soufflé pie dessert jelly beans bear claw.`}
          </Paragraph>
          <BlankSpace ySize="standard" />

      
      </Section>

    </LayoutContainerSide>

  </>
  )
}
export default TextStylesArticle
