import { useEffect, useRef, useState } from "react";
import "./App.css";

export default function App() {
	const globalItems = () => {
		const myListItems = JSON.parse(localStorage.getItem("My_List"));
		if (myListItems) {
			return myListItems;
		} 
    else {
			return [];
		}
	};
	const btnValue = () => {
		const myListItems = JSON.parse(localStorage.getItem("My_List"))||[]
		if (myListItems.length !== 0) {
			return "Remove All";
		} 
    else {
		return "Checklist";
		}
			
	};
	// FOR PROVIDING ALERT IF USER HAVEN'T ENTERED ANYTHING 
	const checklistBtn=()=>{
		const checklist=localStorage.getItem('checklist')
		if(checklist){
			return false

		}
		else{
			return  true
		}
	}
	const inputref = useRef();
	const [btn, setBtn] = useState(btnValue())
	const [text, setText] = useState("");
	const [toggleSubmit, setToggleSubmit] = useState(true);
	const [items, setItems] = useState(globalItems());
	const [editItem, setEditItem] = useState(null);
	const[CheckBtn,setCheckBtn]=useState(checklistBtn())

	// ADDING LIST ITEMS
	const addtodo = () => {
		if (text === "") {
			alert("Enter Some Todo Plan");
			return;
		} 
    else if (text && !toggleSubmit) {
			setItems(
				items.map((z) => {
					if (z.id === editItem) {
						return { ...z, inputdata: text };
					}
					return z;
				})
			);
			setToggleSubmit(true);
			setText("");
			setEditItem(null);
		} 
    else {
			const textdata = { id: new Date().getSeconds(), inputdata: text };
			setItems([...items, textdata]);
			setText("");
			setBtn("Remove All");
			setCheckBtn(true)
		}
	};
	// DELETING LIST ITEMS
	const handledelete = (id) => {
		const filter_item = items.filter((x) => x.id !== id);
		setItems(filter_item);
		setBtn("Checklist");
    setText('')
	};
	// EDITING LIST ITEMS
	const editinput = (id) => {
		const edit_item = items.find((y) => y.id === id) || [];
		setText(edit_item.inputdata);
		setToggleSubmit(false);
		setEditItem(id);
		inputref.current.focus();
    inputref.current.style.color='hotpink'
    inputref.current.style.fontWeight='bold'
	};
	// REMOVING ALL LIST ITEMS AT ONCE
	const removeall = () => {
		if(text==='' && !CheckBtn ){
			alert('Enter Something to Preview')

			
		}
		else if(text==='' && CheckBtn ){
			setItems([]);
			setBtn("Checklist");
			setText('')
			setCheckBtn(false)
		
		}
		

	};
	// SENDING DATA TO THE LOCAL STORAGE EACH TIME OUR ITEMS AND CHECKBTN GETS UPDATED 
	useEffect(() => {
       localStorage.setItem("My_List", JSON.stringify(items));
	   localStorage.setItem('checklist',CheckBtn)
	
	}, [items,CheckBtn]);

	return (
		<div className="container-fluid my-5">
			<div className="row ">
				<div className="col-sm-7 mx-auto text-light shadow-lg  p-2">
					<h2 className="text-center lh-lg">My Todo</h2>
					<div className="row ">
						<div className="col-9">
							<input
								type="text"
								className="form-control"
								placeholder="Write Todo Here!"
								value={text}
								ref={inputref}
								onChange={(e) => setText(e.target.value)}
							/>
						</div>
						<div className="col-3">
							<button
								className="btn btn-primary fw-bold"
								id="addtodobtn"
								onClick={addtodo}
							>
								{toggleSubmit ? "Add Todo" : "Update Item"}
							</button>
						</div>
						<div className="col-3 mx-auto mt-1">
							<button
								className="btn btn-dark fw-bold"
								id="checklist_btn"
								onClick={removeall}
							>
								{btn}
							</button>
						</div>
						<div className="container-fluid">
							<ul className="list-unstyled row m-2">
								{items.map((value) => {
									let { id, inputdata } = value;
									return (
										<>
											<div style={{ display: "flex" }} key={id}>
												<h4 className="mylist_input">{inputdata}</h4>
												<button
													className="btn btn-warning fw-bold text-dark"
													onClick={() => editinput(id)}>Edit</button>
												<button
													className="btn btn-danger fw-bold text-dark "
													onClick={() => handledelete(id)}>Delete</button>
											</div>
										</>
									);
								})}
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
