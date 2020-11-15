import AppContext from "./AppContext";
import React, { useRef, useState, useEffect, Component, useContext } from "react";


export default function testGlobal(){
  	const myContext = useContext(AppContext);
	console.log(myContext.UserIDValus)

	return(
		<View> </View>
	)
	
}