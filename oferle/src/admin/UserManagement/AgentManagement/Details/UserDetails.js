import React from "react";
import { TextField, Typography, MenuItem, Button,Select } from "../../../utilities"
class UserDetails extends React.Component {
    render() {
        return (
            <div className="page-detail-wrapper">

                <Typography className="title" variant="title">Michael Jackson</Typography>

                <div className="detail-wrapper">
                    <p><strong>Email:</strong> michael@example.com</p>
                    <p><strong>Phone Number:</strong> +044 12457878</p>
                    <p><strong>Address:</strong> 241 Shawnee Ave, Russell Springs, KY, 42642</p>
                </div>
            </div>
        )
    }
}

export default UserDetails