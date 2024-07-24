import { useState } from "react";
function Student(){
    let stuInfo=function(name,age){
        this.name=name;
        this.age=age;
        this.showName=function(){
            return this.name;
        }
        this.showAge=function(){
            return this.age;
        }
    }
    let [stuName,setStuName]=useState("");
    let [stuAge,setStuAge]=useState("");
    let [res,setRes]=useState([]);

    function studentName(e){
        setStuName(e.target.value);
    }
    function studentAge(e){
        setStuAge(e.target.value);
    }

    function addStu(name,age){
        let stuObj=new stuInfo(name,age);
        let newArr=[...res,stuObj];
        setRes(newArr);
    }

    function deleteStu(indexToDel){
        let newDelArr=res.filter(function(val,index){
            if (indexToDel===index) return false;
            return true;
        });
        setRes(newDelArr);
    }

    function clearAllStu(){
        setRes([]);
    }
    return (
        <div className="obj">
            <h1> Enter Student Details</h1>
            <input type="text" name="name" value={stuName} onChange={studentName} placeholder="Enter Name"/><br></br>
            <input type="text" name="age" value={stuAge} onChange={studentAge} placeholder="Enter Age"/><br></br>
            <button onClick={function(){
                addStu(stuName,stuAge);
            }}>Add Student</button><br></br>
            <button onClick={clearAllStu}>Clear All Students</button>
            {res.map(function(val,index){
                return <div><b>Student Name:</b>{val.showName()} <b>Age:</b>{val.showAge()}&nbsp;&nbsp;
                <button onClick={function(){
                    deleteStu(index);
                }}>Delete</button>
                </div>

            })}
        </div>
    );
}

export default Student;