

const Tester = (props) => {
  const { crumbs } = props
  const newCrumb = [0,1,2]
  // console.log(crumbs.map(crumb => crumb.text))
  const renderCrumbs = (props) => {
    return crumbs.map(crumb => <li>{crumb.text}</li>)
  }

  return (

      <div>
        <ul>
          {renderCrumbs({props})}  
        </ul>
      </div>
    );

  
}


  

export default Tester

