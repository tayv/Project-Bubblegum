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
      <Heading size="h1">Text Styles</Heading>
      <Paragraph>On this page you'll find text components.</Paragraph>

      <Section id="header" style="standard">
        <Heading size="h3">Heading Component</Heading>
          <Paragraph>
{`The Heading component is used to standardize header text in the app. It has two props: size and type. 

The size prop has four variations: h1, h2, h3 and h4 as well as two type props: primary and secondary. It currently requires special characters to be escaped and cannot be passed links.`}
          </Paragraph>

          <Divider padding="xl" />

          <Heading size="h4">Example: Size Prop Variations</Heading>
          <Heading size="h1">This is an h1 heading</Heading>
          <Heading size="h2">This is an h2 heading</Heading>
          <Heading size="h3">This is an h3 heading</Heading>
          <Heading size="h4">This is an h4 heading</Heading>
          <Heading size="h5">This is an h5 heading</Heading>
          <Heading size="h6">This is an h6 heading</Heading>

          <BlankSpace />
          <Heading size="h4">Example: Style Prop Variations</Heading>
          <Heading size="h4" type="primary">This is a primary type heading</Heading>
          <Heading size="h4" type="secondary">This is a secondary type heading</Heading>

      </Section>

      <Section id="header" style="standard">
        <Heading size="h3">Paragraph Component</Heading>
          <Paragraph>
{`The Paragraph component is used to standardize body text in the app. Currently it has four optional props: size, style, space, and className. 

Text is passed as child element and can use template literals for dynamic or text needing line breaks. If you need to style text you can pass JSX instead.

If you pass custom css via the className prop you can pass override to size, style, or space props to remove the default styles.
`}
          </Paragraph>

          <Divider padding="xl" />

          <Heading size="h4">Examples: Style Prop Variations"</Heading>
          <Paragraph style="primary">This paragraph uses the primary style.</Paragraph>
          <Paragraph style="secondary">This paragraph uses the secondary style.</Paragraph>

          <Divider padding="xl" />
          
          <Heading size="h4">Examples: Size Prop Variations</Heading>

          <Heading size="h4" type="secondary">size = xsmall</Heading>
          <Paragraph size="xsmall">
            {`Topping liquorice bear claw cake cake dessert sweet. Macaroon jujubes marshmallow tart lollipop oat cake cotton candy. Candy gingerbread topping cake wafer chupa chups chocolate cake icing bonbon. Brownie danish powder macaroon brownie toffee chocolate. Cupcake macaroon dessert tart jujubes powder. Fruitcake chocolate bar tiramisu wafer soufflé pie dessert jelly beans bear claw.`}
          </Paragraph>
          <BlankSpace ySize="standard" />

          <Heading size="h4" type="secondary">size = small</Heading>
          <Paragraph size="small">
            {`Topping liquorice bear claw cake cake dessert sweet. Macaroon jujubes marshmallow tart lollipop oat cake cotton candy. Candy gingerbread topping cake wafer chupa chups chocolate cake icing bonbon. Brownie danish powder macaroon brownie toffee chocolate. Cupcake macaroon dessert tart jujubes powder. Fruitcake chocolate bar tiramisu wafer soufflé pie dessert jelly beans bear claw.`}
          </Paragraph>
          <BlankSpace ySize="standard" />

          <Heading size="h4" type="secondary">size = standard</Heading>
          <Paragraph size="standard">
            {`Topping liquorice bear claw cake cake dessert sweet. Macaroon jujubes marshmallow tart lollipop oat cake cotton candy. Candy gingerbread topping cake wafer chupa chups chocolate cake icing bonbon. Brownie danish powder macaroon brownie toffee chocolate. Cupcake macaroon dessert tart jujubes powder. Fruitcake chocolate bar tiramisu wafer soufflé pie dessert jelly beans bear claw.`}
          </Paragraph>

          <BlankSpace ySize="standard" />
          <Heading size="h4" type="secondary">size = large</Heading>
          <Paragraph size="large">
            {`Topping liquorice bear claw cake cake dessert sweet. Macaroon jujubes marshmallow tart lollipop oat cake cotton candy. Candy gingerbread topping cake wafer chupa chups chocolate cake icing bonbon. Brownie danish powder macaroon brownie toffee chocolate. Cupcake macaroon dessert tart jujubes powder. Fruitcake chocolate bar tiramisu wafer soufflé pie dessert jelly beans bear claw.`}
          </Paragraph>
          <BlankSpace ySize="standard" />

          <Heading size="h4" type="secondary">size = xlarge</Heading>
          <Paragraph size="xlarge">
            {`Topping liquorice bear claw cake cake dessert sweet. Macaroon jujubes marshmallow tart lollipop oat cake cotton candy. Candy gingerbread topping cake wafer chupa chups chocolate cake icing bonbon. Brownie danish powder macaroon brownie toffee chocolate. Cupcake macaroon dessert tart jujubes powder. Fruitcake chocolate bar tiramisu wafer soufflé pie dessert jelly beans bear claw.`}
          </Paragraph>
          <BlankSpace ySize="standard" />

          <Heading size="h4" type="secondary">size = xxlarge</Heading>
          <Paragraph size="xxlarge">
            {`Topping liquorice bear claw cake cake dessert sweet. Macaroon jujubes marshmallow tart lollipop oat cake cotton candy. Candy gingerbread topping cake wafer chupa chups chocolate cake icing bonbon. Brownie danish powder macaroon brownie toffee chocolate. Cupcake macaroon dessert tart jujubes powder. Fruitcake chocolate bar tiramisu wafer soufflé pie dessert jelly beans bear claw.`}
          </Paragraph>
          <BlankSpace ySize="standard" />

          <Heading size="h4" type="secondary">size = xxxlarge</Heading>
          <Paragraph size="xxxlarge">
            {`Topping liquorice bear claw cake cake dessert sweet. Macaroon jujubes marshmallow tart lollipop oat cake cotton candy. Candy gingerbread topping cake wafer chupa chups chocolate cake icing bonbon. Brownie danish powder macaroon brownie toffee chocolate. Cupcake macaroon dessert tart jujubes powder. Fruitcake chocolate bar tiramisu wafer soufflé pie dessert jelly beans bear claw.`}
          </Paragraph>
          <BlankSpace ySize="standard" />

          <Divider padding="xl" />

          <Heading size="h4" type="primary">Examples: Space Prop Variations</Heading>

          <Heading size="h4" type="secondary">space = tight</Heading>
          <Paragraph space="tight">
            {`Topping liquorice bear claw cake cake dessert sweet. Macaroon jujubes marshmallow tart lollipop oat cake cotton candy. Candy gingerbread topping cake wafer chupa chups chocolate cake icing bonbon. Brownie danish powder macaroon brownie toffee chocolate. Cupcake macaroon dessert tart jujubes powder. Fruitcake chocolate bar tiramisu wafer soufflé pie dessert jelly beans bear claw.`}
          </Paragraph>
          <BlankSpace ySize="standard" />

          <Heading size="h4" type="secondary">space = snug</Heading>
          <Paragraph space="snug">
            {`Topping liquorice bear claw cake cake dessert sweet. Macaroon jujubes marshmallow tart lollipop oat cake cotton candy. Candy gingerbread topping cake wafer chupa chups chocolate cake icing bonbon. Brownie danish powder macaroon brownie toffee chocolate. Cupcake macaroon dessert tart jujubes powder. Fruitcake chocolate bar tiramisu wafer soufflé pie dessert jelly beans bear claw.`}
          </Paragraph>
          <BlankSpace ySize="standard" />

          <Heading size="h4" type="secondary">space = normal</Heading>
          <Paragraph space="normal">
            {`Topping liquorice bear claw cake cake dessert sweet. Macaroon jujubes marshmallow tart lollipop oat cake cotton candy. Candy gingerbread topping cake wafer chupa chups chocolate cake icing bonbon. Brownie danish powder macaroon brownie toffee chocolate. Cupcake macaroon dessert tart jujubes powder. Fruitcake chocolate bar tiramisu wafer soufflé pie dessert jelly beans bear claw.`}
          </Paragraph>
          <BlankSpace ySize="standard" />

          <Heading size="h4" type="secondary">space = relaxed</Heading>
          <Paragraph space="relaxed">
            {`Topping liquorice bear claw cake cake dessert sweet. Macaroon jujubes marshmallow tart lollipop oat cake cotton candy. Candy gingerbread topping cake wafer chupa chups chocolate cake icing bonbon. Brownie danish powder macaroon brownie toffee chocolate. Cupcake macaroon dessert tart jujubes powder. Fruitcake chocolate bar tiramisu wafer soufflé pie dessert jelly beans bear claw.`}
          </Paragraph>
          <BlankSpace ySize="standard" />

          <Heading size="h4" type="secondary">space = loose</Heading>
          <Paragraph space="loose">
            {`Topping liquorice bear claw cake cake dessert sweet. Macaroon jujubes marshmallow tart lollipop oat cake cotton candy. Candy gingerbread topping cake wafer chupa chups chocolate cake icing bonbon. Brownie danish powder macaroon brownie toffee chocolate. Cupcake macaroon dessert tart jujubes powder. Fruitcake chocolate bar tiramisu wafer soufflé pie dessert jelly beans bear claw.`}
          </Paragraph>
          <BlankSpace ySize="standard" />

          <Heading size="h4" type="secondary">space = none</Heading>
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
