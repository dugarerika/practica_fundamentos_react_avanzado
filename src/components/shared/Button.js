import styled from 'styled-components';

const Button = styled.button`
	float: right;
	margin-right: 20px;
	margin-top: 20px;
	width: 130px;
	height: 30px;
	font-size: 14px;
	font-weight: bold;
	color: #fff;
	background-color: #acd6ef; /*IE fallback*/
	background-image: -webkit-gradient(
		linear,
		left top,
		left bottom,
		from(#acd6ef),
		to(#6ec2e8)
	);
	background-image: -moz-linear-gradient(
		top left 90deg,
		#acd6ef 0%,
		#6ec2e8 100%
	);
	background-image: linear-gradient(top left 90deg, #acd6ef 0%, #6ec2e8 100%);
	border-radius: 30px;
	border: 1px solid #66add6;
	box-shadow: 0 1px 2px rgba(0, 0, 0, .3), inset 0 1px 0 rgba(255, 255, 255, .5);
	cursor: pointer;
`;

export default Button;
