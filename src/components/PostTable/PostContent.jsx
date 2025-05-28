import { DataGrid } from "@mui/x-data-grid";
import React, { useState } from 'react';
import { userColumns, userRows } from '../../PostData';
import './PostContent.scss';

// Local images
import post1img1 from '../../assets/images/post1-img1.png';
import post1img2 from '../../assets/images/post1-img2.png';
import post2img1 from '../../assets/images/post2-img1.png';
import post2img2 from '../../assets/images/post2-img2.png';

const postImages = {
  1: [post1img1, post1img2],
  2: [post2img1, post2img2],
};

const PostContent = () => {
  const [data, setData] = useState(userRows);
  const [selectedPost, setSelectedPost] = useState(null);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
    if (selectedPost?.id === id) setSelectedPost(null);
  };

  const handleView = (row) => {
    setSelectedPost({
      ...row,
      headline: `Headline for Post ${row.postID}`,
      caption: `This is a sample caption for post ${row.postID}.`,
      imageUrls: postImages[row.postID] || [],
    });
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: (params) => (
        <div className="cellAction">
          <div className="viewButton" onClick={() => handleView(params.row)}>
            View
          </div>
          <div className="editButton">Edit</div>
          <div className="deleteButton" onClick={() => handleDelete(params.row.id)}>
            Delete
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="postCompnents">
      <div className="postTable">
        <DataGrid
          className="datagrid"
          rows={data}
          columns={userColumns.concat(actionColumn)}
          pageSize={4}
          rowsPerPageOptions={[4]}
          checkboxSelection
          disableSelectionOnClick
        />
      </div>
      {selectedPost && (
        <div className="postDetails">
          <h2>{selectedPost.headline}</h2>
          <p>{selectedPost.caption}</p>
          <div className="imageGallery">
            {selectedPost.imageUrls.map((url, index) => (
              <img key={index} src={url} alt={`Post ${selectedPost.postID} - Image ${index + 1}`} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PostContent;
