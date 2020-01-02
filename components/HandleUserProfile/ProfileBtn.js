import React, { useEffect } from 'react';
import { FaUserCog } from 'react-icons/fa';

const ProfileBtn = () => {
	return (
		<div className=''>
			<div className='profile-button trigger-profile'>
				<span className='icon'>
					<FaUserCog />
				</span>
			</div>

			<style jsx>{`
				.profile-button {
					position: absolute;
					right: 5px;
					top: 15px;
					width: 50px;
					height: 50px;
					background: #553055;
					color: #fff;
					border-radius: 50%;
					float: right;
				}

				.profile-button .icon {
					position: absolute;
					right: 9%;
					top: 50%;
					-webkit-transform: translate(-50%, -50%);
					-ms-transform: translate(-50%, -50%);
					transform: translate(-50%, -50%);
					font-size: 1.2rem;
				}
			`}</style>
		</div>
	);
};

export default ProfileBtn;
