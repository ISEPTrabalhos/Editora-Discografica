angular
	.module('app')
	.controller('home_controller', ['$scope', function($scope) {
		$scope.cds = [
		{
			id: '1',
			url: '#',
			img: 'http://a4.mzstatic.com/us/r30/Music3/v4/2c/b1/87/2cb187fa-2da2-839e-436a-8997561c0493/UMG_cvrart_00843930013562_01_RGB72_1400x1400_14UMDIM03405.600x600-75.jpg',
			album: '1989',
			artist: 'Taylor Swift'
		},
		{
			id: '2',
			url: '#',
			img: 'http://a5.mzstatic.com/us/r30/Music5/v4/7a/f8/dc/7af8dc27-1c9b-5ee2-920d-f8776bce1334/UMG_cvrart_00602537943500_01_RGB72_1500x1500_14UMGIM43868.600x600-75.jpg',
			album: 'Cadillactica',
			artist: 'Big K.R.I.T.'
		},
		{
			id: '3',
			url: '#',
			img: 'http://a2.mzstatic.com/us/r30/Music3/v4/34/c1/73/34c173c0-faf9-27e6-cac4-f5b6b71f782a/886444955379.600x600-75.jpg',
			album: 'BEYONCÉ [Platinum Edition]',
			artist: 'Beyoncé'
		},
		{
			id: '4',
			url: '#',
			img: 'http://a3.mzstatic.com/us/r30/Music3/v4/87/85/ec/8785ecf8-231c-9ba4-d0da-71379ada6736/UMG_cvrart_00602547140135_01_RGB72_1800x1800_14UMGIM55255.600x600-75.jpg',
			album: 'Jealous',
			artist: 'Nick Jonas'
		},
		{
			id: '5',
			url: '#',
			img: 'http://a4.mzstatic.com/us/r30/Music3/v4/1f/53/35/1f533522-29e9-948d-eaa8-bcc2a854af3e/UMG_cvrart_00602547034830_01_RGB72_1500x1500_14UMGIM42058.600x600-75.jpg',
			album: 'Montevallo',
			artist: 'Sam Hunt'
		},
		{
			id: 6,
			url: '#',
			img: 'http://a1.mzstatic.com/us/r30/Music3/v4/67/74/dd/6774dd4d-f6a9-a6d2-a15d-7be7ac8ab138/825646175765.600x600-75.jpg',
			album: 'FROOT',
			artist: 'Marina and The Diamonds'
		}];
	}]);