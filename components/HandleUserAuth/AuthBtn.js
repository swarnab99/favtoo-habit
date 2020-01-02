import React, { useEffect } from 'react';
import { FaUser } from 'react-icons/fa';

const AuthBtn = () => {
	useEffect(() => {
		var authModal = document.querySelector('.auth-modal');
		var triggerAuth = document.querySelector('.trigger-auth');
		// var closeButton = document.querySelector(".close-button")

		function toggleModal() {
			authModal.classList.toggle('show-modal');
			triggerAuth.classList.toggle('d-none');
		}

		function windowOnClick(event) {
			if (event.target === authModal) {
				toggleModal();
			}
		}

		triggerAuth.addEventListener('click', toggleModal);
		// closeButton.addEventListener("click", toggleModal)
		window.addEventListener('click', windowOnClick);
	}, []);
	return (
		<div className=''>
			<div className='auth-button trigger-auth'>
				<span className='icon'>
					<FaUser />
				</span>
			</div>

			<style jsx>{`
				.auth-button {
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

				.auth-button .icon {
					position: absolute;
					right: 19%;
					top: 50%;
					transform: translate(-50%, -50%);
				}
			`}</style>
		</div>
	);
};

export default AuthBtn;
