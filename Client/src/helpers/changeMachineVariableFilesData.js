function changeMachineVariableFilesData(machine,fid,accessor,dataIndicator,data){
    var tmpVariableFiles = machine.variableFiles;
    tmpVariableFiles[fid][accessor].data[dataIndicator] = data;

    console.log({
        ...machine,
        variableFiles:tmpVariableFiles
    })
    return {
        ...machine,
        variableFiles:tmpVariableFiles
    };
}

export default  changeMachineVariableFilesData;