pragma solidity >=0.4.24<=0.6.0;

contract Simple{

    //struct user{
        string username;
        string password;
   // }
    

    //定义事件
    event Instructor(string  name, string  password);

    function set(string memory _name, string memory _password) public {
        username = _name;
        password = _password;
        //触发事件
        emit Instructor(username, password);
    }

    function get() public view returns(string memory, string memory) {
        return (username, password);
    }
}