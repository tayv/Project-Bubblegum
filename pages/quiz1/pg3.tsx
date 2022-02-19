import {FormEvent, useState} from 'react' 
import Breadcrumbs from '@components/Breadcrumbs'

export default function MyRadioGroup() {
  let [submittingForm, setSubmittingForm] = useState(false)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmittingForm(true)

    // simulate asynchronous form submission via API
    setTimeout(() => {
      setSubmittingForm(false)
      alert("You have submitted the form.")
    }, 3000)
  }

  return (
    <> 
    <Breadcrumbs></Breadcrumbs>
    
    <form onSubmit={handleSubmit}>
      <fieldset className="pb-4">
        <div className="block" >
          <input type="radio" value="yay" id="yay"
            //    onChange={this.handleChange} name="gender" 
          />
          <label htmlFor="male">Yay</label>
        </div>
      
      <input type="radio" value="nay" id="nay"
      //   onChange={this.handleChange} name="gender"
      />
        <label htmlFor="female">Nay</label> 
      </fieldset>
      
      <button type="submit" className="border-solid border-2 px-2">Submit</button>
      
      {submittingForm && <div>The form is being submitted...</div>}
    </form>

    </>
  )
}