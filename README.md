bash-server
a server for <a href="https://github.com/thinkful-ei-macaw/Ian-capstone-clien">Bashful</a>

<h2>endpoints</h2>
"/" <br/> methods: Post </br>
Payload: {title: "string", author_id: "number corresponding to id of user in database"}</br>
</br>"/commands" </br>
method: GET </br> 
returns an array of objects corresponding to the supported bash commands ie: {"id":1,"command_name":"echo","description":"this command prints the text of a file to the bash terminal, youll need to specify the path of a file to use it (see below on how to find filepaths). This command will also print out whatever argument you give below if its in quotes e.g. \"hello, World!\"","extra_field":true}</br>
</br> "/input" </br>
method:GET </br>
returns the all the supported line formats from the database ie </br>{"id":1,"script_name":"for","extra_input":true,"description":"this will repeat the command given a set number of times"}</br></br>
method: POST</br>
adds all lines added on page to database with script relation corresponding to id of the script_title currently of the current page</br>
payload: lines: [{type: "command||for||IF=f", command: "string from command options in database", description: "string", arg1: "string", script_relation: "number corresponding a script_title's id"}]
</br>
</br>"/input/:scriptId" </br>
method: GET</br>
returns all scripts with a script_relation equal to the param scriptId</br>
eg:[{"id":15,"type":"command","command":"","duration":null,"condition":null,"script_relation":32,"description":"","arg1":"","arg2":null,"arg3":null}]</br>
</br>
"/output/:scriptId"</br>
method:GET</br>
returns the concatenated script of all the lines with a script_relation matching that of the param scriptId</br>
ie: "#!/bin/bash\n echo Hello World"
