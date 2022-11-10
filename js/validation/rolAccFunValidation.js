"use strict";

function checkFormRolAccFun(e, action) {
    if(checkRoleId(action) & checkActionId(action) & checkFunctionalityId(action)){
        return true;
    } else {
        return false;
    }
}