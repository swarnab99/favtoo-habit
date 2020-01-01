import React, { useEffect } from 'react';
import { FaPlus } from 'react-icons/fa';

const CreateBtn = () => {
	useEffect(() => {
		var modal = document.querySelector('.modal');
		var trigger = document.querySelector('.trigger');
		// var closeButton = document.querySelector(".close-button")

		function toggleModal() {
			modal.classList.toggle('show-modal');
			trigger.classList.toggle('d-none');
		}

		function windowOnClick(event) {
			if (event.target === modal) {
				toggleModal();
			}
		}

		trigger.addEventListener('click', toggleModal);
		// closeButton.addEventListener("click", toggleModal)
		window.addEventListener('click', windowOnClick);
	}, []);
	return (
		<div className=''>
			<div className='create-btn trigger'>
				<span className='icon'>
					<FaPlus />
				</span>
			</div>

			<style jsx>{`
				.create-btn {
					position: fixed;
					right: 5px;
					bottom: 5px;
					width: 50px;
					height: 50px;
					background: #6d3d6d;
					color: #fff;
					border-radius: 50%;
				}

				.create-btn .icon {
					position: absolute;
					right: 19%;
					top: 50%;
					transform: translate(-50%, -50%);
				}
			`}</style>
		</div>
	);
};

export default CreateBtn;
