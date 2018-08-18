# 前后端对接文档
### 管理员发起志愿者活动
- 权限级别：管理员
- 路由：`/api/manager/publish/volunteer`
- 请求方法：`POST`
- 请求参数：
    - 示例：
        ```json
        {
            "title": "Some Fun",
            "details": "Help the lazy dog jump over the quick brown fox.",
            "actionTime": "2018-09-16 00:00:00",
            "member": 80
        }
        ```
    - 说明
        <table>
            <thead>
                <tr>
                    <th>参数名称</th>
                    <th>参数类型</th>
                    <th>参数说明</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>title</td>
                    <td>string</td>
                    <td>活动标题。</td>
                </tr>
                <tr>
                    <td>details</td>
                    <td>string</td>
                    <td>活动详情。</td>
                </tr>
                <tr>
                    <td>actionTime</td>
                    <td>string</td>
                    <td>志愿活动开始时间。晚于当前时间。</td>
                </tr>
                <tr>
                    <td>member</td>
                    <td>int</td>
                    <td>限制报名人数。</td>
                </tr>
            </tbody>
        </table>
- 返回参数：
    - 示例
        ```json
        {
            "errCode": 0,
            "errMsg": "",
            "id": 12
        }
        ```
    - 说明
        <table>
            <thead>
                <tr>
                    <th>参数名称</th>
                    <th>参数类型</th>
                    <th>参数说明</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>errCode</td>
                    <td>int</td>
                    <td>错误码。0代表成功，非0代表意外错误。</td>
                </tr>
                <tr>
                    <td>errMsg</td>
                    <td>string</td>
                    <td>错误信息。</td>
                </tr>
                <tr>
                    <td>id</td>
                    <td>int</td>
                    <td>发起活动的id。仅当成功时存在。</td>
                </tr>
            </tbody>
        </table>
### 管理员发起福利活动
- 权限级别：管理员
- 路由：`/api/manager/publish/award`
- 请求方法：`POST`
- 请求参数：
    - 示例：
        ```json
        {
            "title": "Ticket",
            "details": "None.",
            "bookTime": "2018-09-25 19:00:00",
            "award": 40,
            "memberList": [10, 10, 10, 10, 10, 10, 10, 10, 10, 10]
        }
        ```
    - 说明
        <table>
            <thead>
                <tr>
                    <th>参数名称</th>
                    <th>参数类型</th>
                    <th>参数说明</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>title</td>
                    <td>string</td>
                    <td>活动标题。</td>
                </tr>
                <tr>
                    <td>details</td>
                    <td>string</td>
                    <td>活动详情。</td>
                </tr>
                <tr>
                    <td>bookTime</td>
                    <td>string</td>
                    <td>福利领取时间。晚于当前时间。</td>
                </tr>
                <tr>
                    <td>award</td>
                    <td>int</td>
                    <td>奖品数。</td>
                </tr>
                <tr>
                    <td>memberList</td>
                    <td>array</td>
                    <td>限制的各个部门的领奖人数。</td>
                </tr>
            </tbody>
        </table>
- 返回参数：
    - 示例
        ```json
        {
            "errCode": 0,
            "errMsg": "",
            "id": 12
        }
        ```
    - 说明
        <table>
            <thead>
                <tr>
                    <th>参数名称</th>
                    <th>参数类型</th>
                    <th>参数说明</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>errCode</td>
                    <td>int</td>
                    <td>错误码。0代表成功，非0代表意外错误。</td>
                </tr>
                <tr>
                    <td>errMsg</td>
                    <td>string</td>
                    <td>错误信息。</td>
                </tr>
                <tr>
                    <td>id</td>
                    <td>int</td>
                    <td>发起活动的id。仅当成功时存在。</td>
                </tr>
            </tbody>
        </table>
### 浏览活动情况
- 权限级别：用户
- 路由：`/api/user/query/activity`
- 请求方法：`POST`
- 请求参数：
    - 示例
        ```json
        {
            "type": 0,
            "startId": 10,
            "number": 3
        }
        ```
    - 说明
        <table>
            <thead>
                <tr>
                    <th>参数名称</th>
                    <th>参数类型</th>
                    <th>参数说明</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>type</td>
                    <td>int</td>
                    <td>查询类型。为0时表示查找所有活动，为1时表示查找自己未报名的活动，为2时表示查找自己已报名的活动，为3时表示查找自己发起的活动。</td>
                </tr>
                <tr>
                    <td>startId</td>
                    <td>int</td>
                    <td>查询活动id的起点。查找id<=startId的活动，直到查找到number个活动或到达末尾为止。</td>
                </tr>
                <tr>
                    <td>number</td>
                    <td>int</td>
                    <td>活动的数量。</td>
                </tr>
            </tbody>
        </table>
- 返回参数：
    - 示例
        ```json
        {
            "errCode": 0,
            "errMsg": "",
            "data": {
                "isEnd": false,
                "activities": [
                    {
                        "id": 9,
                        "isPublisher": true,
                        "type": 0,
                        "title": "Some Fun",
                        "details": "Help the lazy dog jump over the quick brown fox.",
                        "actionTime": "2018-09-26 00:00:00",
                        "member": 80,
                        "currentMember": 23
                    },
                    {
                        "id": 8,
                        "isPublisher": true,
                        "type": 1,
                        "title": "Ticket",
                        "details": "None.",
                        "bookTime": "2018-09-25 19:00:00",
                        "award": 40,
                        "currentMember": 37,
                        "isDepartmentFull": false
                    },
                    {
                        "id": 6,
                        "isPublisher": false,
                        "type": 0,
                        "title": "Some Fun",
                        "details": "Help the lazy dog jump over the quick brown fox.",
                        "actionTime": "2018-09-16 00:00:00",
                        "member": 80,
                        "currentMember": 80
                    }
                ]
            }
        }
        ```
    - 说明
        <table>
            <thead>
                <tr>
                    <th>参数名称</th>
                    <th>参数类型</th>
                    <th>参数说明</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>errCode</td>
                    <td>int</td>
                    <td>错误码。0代表成功，非0代表意外错误。</td>
                </tr>
                <tr>
                    <td>errMsg</td>
                    <td>string</td>
                    <td>错误信息。</td>
                </tr>
                <tr>
                    <td>isEnd</td>
                    <td>bool</td>
                    <td>查询是否达到末尾。若为true，表示不能继续查询。</td>
                </tr>
                <tr>
                    <td>id</td>
                    <td>int</td>
                    <td>活动的id。</td>
                </tr>
                <tr>
                    <td>isPublisher</td>
                    <td>bool</td>
                    <td>是否为该活动发起人。</td>
                </tr>
                <tr>
                    <td>type</td>
                    <td>int</td>
                    <td>活动类型。0代表志愿者活动，1代表福利活动。</td>
                </tr>
                <tr>
                    <td>title</td>
                    <td>string</td>
                    <td>活动标题。</td>
                </tr>
                <tr>
                    <td>details</td>
                    <td>string</td>
                    <td>活动详情。</td>
                </tr>
                <tr>
                    <td>actionTime</td>
                    <td>string</td>
                    <td>志愿活动开始时间。</td>
                </tr>
                <tr>
                    <td>bookTime</td>
                    <td>string</td>
                    <td>福利领取时间。</td>
                </tr>
                <tr>
                    <td>member</td>
                    <td>int</td>
                    <td>限制报名人数。</td>
                </tr>
                <tr>
                    <td>award</td>
                    <td>int</td>
                    <td>奖品数。</td>
                </tr>
                <tr>
                    <td>currentMember</td>
                    <td>int</td>
                    <td>已参与人数。</td>
                </tr>
                <tr>
                    <td>isDepartmentFull</td>
                    <td>bool</td>
                    <td>所在部门名额是否已满。</td>
                </tr>
            </tbody>
        </table>
### 管理员查询各部门报名人数
- 权限级别：管理员
- 路由：`/api/manager/query/department`
- 请求方法：`POST`
- 请求参数：
    - 示例
        ```json
        {
            "id": 10
        }
        ```
    - 说明
        <table>
            <thead>
                <tr>
                    <th>参数名称</th>
                    <th>参数类型</th>
                    <th>参数说明</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>id</td>
                    <td>int</td>
                    <td>活动的id。</td>
                </tr>
            </tbody>
        </table>
- 返回参数：
    - 示例
        ```json
        {
            "errCode": 0,
            "errMsg": "",
            "data": {
                "memberList": [10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
                "currentMemberList": [2, 6, 10, 7, 12, 8, 4, 3, 9, 10]
            }
        }
        ```
        <table>
            <thead>
                <tr>
                    <th>参数名称</th>
                    <th>参数类型</th>
                    <th>参数说明</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>errCode</td>
                    <td>int</td>
                    <td>错误码。0代表成功，非0代表意外错误。</td>
                </tr>
                <tr>
                    <td>errMsg</td>
                    <td>string</td>
                    <td>错误信息。</td>
                </tr>
                <tr>
                    <td>memberList</td>
                    <td>array</td>
                    <td>限制的各个部门的领奖人数。仅当活动type为1时存在。</td>
                </tr>
                <tr>
                    <td>currentMemberList</td>
                    <td>array</td>
                    <td>各个部门已报名、领奖人数。</td>
                </tr>
            </tbody>
        </table>
### 管理员浏览报名用户信息
- 权限级别：管理员
- 路由：`/api/manager/query/userinfo`
- 请求方法：`POST`
- 请求参数：
    - 示例
        ```json
        {
            "id": 10,
            "startOrd": 21,
            "number": 3
        }
        ```
    - 说明
        <table>
            <thead>
                <tr>
                    <th>参数名称</th>
                    <th>参数类型</th>
                    <th>参数说明</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>id</td>
                    <td>int</td>
                    <td>活动的id。</td>
                </tr>
                <tr>
                    <td>startOrd</td>
                    <td>int</td>
                    <td>查询报名用户的起点。排序为按报名时间从先到后的顺序。查询机制类似于“浏览活动情况”。</td>
                </tr>
                <tr>
                    <td>number</td>
                    <td>int</td>
                    <td>查询活动的数量。</td>
                </tr>
            </tbody>
        </table>
- 返回参数：
    - 示例
        ```json
        {
            "errCode": 0,
            "errMsg": "",
            "data": {
                "isEnd": true,
                "users": [
                    {
                        "userName": "张三",
                        "department": 1,
                        "tele": "13110111011"
                    },
                    {
                        "userName": "李四",
                        "department": 7,
                        "tele": "13111111011"
                    },
                    {
                        "userName": "王五",
                        "department": 0,
                        "tele": "13112111011"
                    }
                ]
            }
        }
        ```
        <table>
            <thead>
                <tr>
                    <th>参数名称</th>
                    <th>参数类型</th>
                    <th>参数说明</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>errCode</td>
                    <td>int</td>
                    <td>错误码。0代表成功，非0代表意外错误。</td>
                </tr>
                <tr>
                    <td>errMsg</td>
                    <td>string</td>
                    <td>错误信息。</td>
                </tr>
                <tr>
                    <td>isEnd</td>
                    <td>bool</td>
                    <td>是否达到末尾。若为true，表示不能继续查询。</td>
                </tr>
                <tr>
                    <td>userName</td>
                    <td>string</td>
                    <td>报名用户姓名。</td>
                </tr>
                <tr>
                    <td>department</td>
                    <td>int</td>
                    <td>报名用户所在部门。</td>
                </tr>
                <tr>
                    <td>tele</td>
                    <td>string</td>
                    <td>报名用户电话号码。</td>
                </tr>
            </tbody>
        </table>
### 管理员下载.csv文件
- 权限级别：管理员
- 路由：`/api/manager/download`
- 请求方法：`POST`
- 请求参数：
    - 示例
        ```json
        {
            "id": 10
        }
        ```
    - 说明
        <table>
            <thead>
                <tr>
                    <th>参数名称</th>
                    <th>参数类型</th>
                    <th>参数说明</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>id</td>
                    <td>int</td>
                    <td>活动的id。</td>
                </tr>
            </tbody>
        </table>
### 用户报名
- 权限级别：用户
- 路由：`/api/user/register`
- 请求方法：`POST`
- 请求参数：
    - 示例
        ```json
        {
            "id": 14
        }
        ```
    - 说明
        <table>
            <thead>
                <tr>
                    <th>参数名称</th>
                    <th>参数类型</th>
                    <th>参数说明</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>id</td>
                    <td>int</td>
                    <td>活动的id。</td>
                </tr>
            </tbody>
        </table>
- 返回参数：
    - 示例
        ```json
        {
            "errCode": 0,
            "errMsg": "",
            "status": 0
        }
        ```
        <table>
            <thead>
                <tr>
                    <th>参数名称</th>
                    <th>参数类型</th>
                    <th>参数说明</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>errCode</td>
                    <td>int</td>
                    <td>错误码。0代表成功，非0代表意外错误。</td>
                </tr>
                <tr>
                    <td>errMsg</td>
                    <td>string</td>
                    <td>错误信息。</td>
                </tr>
                <tr>
                    <td>status</td>
                    <td>int</td>
                    <td>参与状态。为0时表示参与成功，为1时表示参与总人数已上限，为2时表示所在部门参与人数已上限。</td>
                </tr>
            </tbody>
        </table>
### 活动发起人修改活动（类型、标题不予修改，活动开始后活动不予修改）
- 权限级别：活动发起人
- 路由：`/api/publisher/modify`
- 请求方法：`POST`
- 请求参数：
    - 示例
        ```json
        // 志愿者活动
        {
            "id": 10,
            "details": "Help the lazy dog jump over the quick brown fox.",
            "actionTime": "2018-09-16 00:00:00",
            "member": 80
        }

        // 福利活动
        {
            "id": 20,
            "details": "None.",
            "bookTime": "2018-09-25 19:00:00",
            "award": 40,
            "memberList": [10, 10, 10, 10, 10, 10, 10, 10, 10, 10]
        }
        ```
    - 说明
        <table>
            <thead>
                <tr>
                    <th>参数名称</th>
                    <th>参数类型</th>
                    <th>参数说明</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>id</td>
                    <td>int</td>
                    <td>活动的id。</td>
                </tr>
                <tr>
                    <td>details</td>
                    <td>string</td>
                    <td>活动详情。</td>
                </tr>
                <tr>
                    <td>actionTime</td>
                    <td>string</td>
                    <td>志愿活动开始时间。晚于当前时间。</td>
                </tr>
                <tr>
                    <td>bookTime</td>
                    <td>string</td>
                    <td>福利领取时间。晚于当前时间。</td>
                </tr>
                <tr>
                    <td>member</td>
                    <td>int</td>
                    <td>限制报名人数。为避免逻辑上踢掉已报名的人，应不小于之前的数值。</td>
                </tr>
                <tr>
                    <td>award</td>
                    <td>int</td>
                    <td>奖品数。</td>
                </tr>
                <tr>
                    <td>memberList</td>
                    <td>array</td>
                    <td>限制的各个部门的领奖人数。</td>
                </tr>
            </tbody>
        </table>
- 返回参数：
    - 示例
        ```json
        {
            "errCode": 0,
            "errMsg": ""
        }
        ```
    - 说明
        <table>
            <thead>
                <tr>
                    <th>参数名称</th>
                    <th>参数类型</th>
                    <th>参数说明</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>errCode</td>
                    <td>int</td>
                    <td>错误码。0代表成功，非0代表意外错误。</td>
                </tr>
                <tr>
                    <td>errMsg</td>
                    <td>string</td>
                    <td>错误信息。</td>
                </tr>
            </tbody>
        </table>
### 活动发起人删除活动
- 权限级别：活动发起人
- 路由：`/api/publisher/delete`
- 请求方法：`POST`
- 请求参数：
    - 示例
        ```json
        {
            "id": 10
        }
        ```
    - 说明
        <table>
            <thead>
                <tr>
                    <th>参数名称</th>
                    <th>参数类型</th>
                    <th>参数说明</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>id</td>
                    <td>int</td>
                    <td>活动的id。</td>
                </tr>
            </tbody>
        </table>
- 返回参数：
    - 示例
        ```json
        {
            "errCode": 0,
            "errMsg": ""
        }
        ```
    - 说明
        <table>
            <thead>
                <tr>
                    <th>参数名称</th>
                    <th>参数类型</th>
                    <th>参数说明</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>errCode</td>
                    <td>int</td>
                    <td>错误码。0代表成功，非0代表意外错误。</td>
                </tr>
                <tr>
                    <td>errMsg</td>
                    <td>string</td>
                    <td>错误信息。</td>
                </tr>
            </tbody>
        </table>
### 活动发起人随机补齐人数（只适用于志愿者活动）
- 权限级别：活动发起人
- 路由：`/api/publisher/roll`
- 请求方法：`POST`
- 请求参数：
    - 示例
        ```json
        {
            "id": 10
        }
        ```
    - 说明
        <table>
            <thead>
                <tr>
                    <th>参数名称</th>
                    <th>参数类型</th>
                    <th>参数说明</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>id</td>
                    <td>int</td>
                    <td>活动的id。</td>
                </tr>
            </tbody>
        </table>
- 返回参数：
    - 示例
        ```json
        {
            "errCode": 0,
            "errMsg": "",
            "status": 0
        }
        ```
    - 说明
        <table>
            <thead>
                <tr>
                    <th>参数名称</th>
                    <th>参数类型</th>
                    <th>参数说明</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>errCode</td>
                    <td>int</td>
                    <td>错误码。0代表成功，非0代表意外错误。</td>
                </tr>
                <tr>
                    <td>errMsg</td>
                    <td>string</td>
                    <td>错误信息。</td>
                </tr>
                <tr>
                    <td>status</td>
                    <td>int</td>
                    <td>补齐状态。为0时表示补齐成功，为1时表示人数已满。</td>
                </tr>
            </tbody>
        </table>