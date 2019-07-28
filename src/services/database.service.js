const DatabaseService = {
	SetData,
	GetData
};

export default DatabaseService;

let data;

function SetData(dataObj) {
	data = dataObj;
}

function GetData() {
	return data || {
		"version": 10000.0,
		"modified": "2019-07-13 15:30:38",
		"database": {
		  "users": [
			{
			  "name": "munaf-matadar",
			  "capabilities": {
				"toastmaster": 0,
				"grammarian": 1,
				"evaluator": 1,
				"speaker": 1,
				"topicsmaster": 1,
				"timekeeper": 1,
				"general-evaluator": 0
			  },
			  "history": {
				"toastmaster": [],
				"grammarian": [],
				"evaluator": [],
				"speaker": ["2019-07-18"],
				"topicsmaster": [],
				"timekeeper": [],
				"general-evaluator": []
			  }
			},
			{
			  "name": "bamike-kuyoro",
			  "capabilities": {
				"toastmaster": 0,
				"grammarian": 1,
				"evaluator": 1,
				"speaker": 1,
				"topicsmaster": 1,
				"timekeeper": 1,
				"general-evaluator": 0
			  },
			  "history": {
				"toastmaster": [],
				"grammarian": ["2019-06-06"],
				"evaluator": [],
				"speaker": [],
				"topicsmaster": [],
				"timekeeper": [],
				"general-evaluator": []
			  }
			},
			{
			  "name": "marie-harrigan",
			  "capabilities": {
				"toastmaster": 0,
				"grammarian": 1,
				"evaluator": 1,
				"speaker": 1,
				"topicsmaster": 1,
				"timekeeper": 1,
				"general-evaluator": 0
			  },
			  "history": {
				"toastmaster": [],
				"grammarian": [],
				"evaluator": [],
				"speaker": [],
				"topicsmaster": [],
				"timekeeper": [],
				"general-evaluator": []
			  }
			},
			{
			  "name": "shweta-mehra",
			  "capabilities": {},
			  "history": {}
			},
			{
			  "name": "shawn-simmons",
			  "capabilities": {},
			  "history": {}
			},
			{
			  "name": "ryan-paranagama",
			  "capabilities": {},
			  "history": {}
			},
			{
			  "name": "maame-apenteng",
			  "capabilities": {
				"toastmaster": 1,
				"grammarian": 1,
				"evaluator": 1,
				"speaker": 1,
				"topicsmaster": 1,
				"timekeeper": 1,
				"general-evaluator": 0
			  },
			  "history": {
				"toastmaster": [],
				"grammarian": [],
				"evaluator": ["2019-07-18"],
				"speaker": ["2019-06-06"],
				"topicsmaster": ["2019-06-27"],
				"timekeeper": []
			  }
			},
			{
			  "name": "lisa-simms",
			  "capabilities": {},
			  "history": {}
			},
			{
			  "name": "devin-bialo",
			  "capabilities": {},
			  "history": {}
			},
			{
			  "name": "david-porretta",
			  "capabilities": {},
			  "history": {}
			},
			{
			  "name": "david-cronk",
			  "capabilities": {},
			  "history": {}
			},
			{
			  "name": "victoria-nguyen",
			  "capabilities": {
				"toastmaster": 1,
				"grammarian": 1,
				"evaluator": 1,
				"speaker": 1,
				"topicsmaster": 1,
				"timekeeper": 1,
				"general-evaluator": 1
			  },
			  "history": {
				"toastmaster": [],
				"grammarian": [],
				"evaluator": [],
				"speaker": [],
				"topicsmaster": [],
				"timekeeper": [],
				"general-evaluator": []
			  }
			},
			{
			  "name": "kurt-henry",
			  "capabilities": {
				"toastmaster": 1,
				"grammarian": 1,
				"evaluator": 1,
				"speaker": 1,
				"topicsmaster": 1,
				"timekeeper": 1,
				"general-evaluator": 1
			  },
			  "history": {
				"toastmaster": [],
				"grammarian": [],
				"evaluator": ["2019-04-17"],
				"speaker": [],
				"topicsmaster": [],
				"timekeeper": [],
				"general-evaluator": ["2019-06-06"]
			  }
			},
			{
			  "name": "dana-woo",
			  "capabilities": {
				"toastmaster": 1,
				"grammarian": 1,
				"evaluator": 1,
				"speaker": 1,
				"topicsmaster": 1,
				"timekeeper": 1,
				"general-evaluator": 1
			  },
			  "history": {
				"toastmaster": [],
				"grammarian": ["2019-07-18"],
				"evaluator": ["2019-06-06"],
				"speaker": [],
				"topicsmaster": [],
				"timekeeper": [],
				"general-evaluator": []
			  }
			},
			{
			  "name": "jason-cronk",
			  "capabilities": {},
			  "history": {}
			},
			{
			  "name": "yuki-zhong",
			  "capabilities": {
				"toastmaster": 1,
				"grammarian": 1,
				"evaluator": 1,
				"speaker": 1,
				"topicsmaster": 1,
				"timekeeper": 1,
				"general-evaluator": 0
			  },
			  "history": {
				"toastmaster": [],
				"grammarian": [],
				"evaluator": ["2019-06-06"],
				"speaker": ["2019-05-15"],
				"topicsmaster": [],
				"timekeeper": []
			  }
			},
			{
			  "name": "leonard-yu",
			  "capabilities": {
				"toastmaster": 0,
				"grammarian": 1,
				"evaluator": 1,
				"speaker": 1,
				"topicsmaster": 1,
				"timekeeper": 1,
				"general-evaluator": 0
			  },
			  "history": {
				"grammarian": ["2019-04-17"],
				"evaluator": [],
				"speaker": [],
				"topicsmaster": [],
				"timekeeper": []
			  }
			},
			{
			  "name": "shaun-gomes",
			  "capabilities": {
				"toastmaster": 0,
				"grammarian": 1,
				"evaluator": 1,
				"speaker": 1,
				"topicsmaster": 1,
				"timekeeper": 1,
				"general-evaluator": 0
			  },
			  "history": {
				"grammarian": [],
				"evaluator": [],
				"speaker": [],
				"topicsmaster": [],
				"timekeeper": []
			  }
			},
			{
			  "name": "priyanka-shukla",
			  "capabilities": {},
			  "history": {}
			},
			{
			  "name": "krishna-jayarajan",
			  "capabilities": {
				"toastmaster": 1,
				"grammarian": 1,
				"evaluator": 1,
				"speaker": 1,
				"topicsmaster": 1,
				"timekeeper": 1,
				"general-evaluator": 0
			  },
			  "history": {
				"toastmaster": [],
				"grammarian": [],
				"evaluator": [],
				"speaker": ["2019-03-27"],
				"topicsmaster": ["2019-05-15"],
				"timekeeper": []
			  }
			},
			{
			  "name": "julie-tyios",
			  "capabilities": {},
			  "history": {}
			},
			{
			  "name": "jason-milley",
			  "capabilities": {
				"toastmaster": 0,
				"grammarian": 1,
				"evaluator": 1,
				"speaker": 1,
				"topicsmaster": 1,
				"timekeeper": 1,
				"general-evaluator": 0
			  },
			  "history": {
				"grammarian": [],
				"evaluator": [],
				"speaker": [],
				"topicsmaster": [],
				"timekeeper": []
			  }
			},
			{
			  "name": "chandira-manoharan",
			  "capabilities": {
				"toastmaster": 0,
				"grammarian": 1,
				"evaluator": 1,
				"speaker": 1,
				"topicsmaster": 1,
				"timekeeper": 1,
				"general-evaluator": 0
			  },
			  "history": {
				"toastmaster": [],
				"grammarian": [],
				"evaluator": [],
				"speaker": [],
				"topicsmaster": [],
				"timekeeper": ["2019-04-17"]
			  }
			},
			{
			  "name": "nikhil-metrani",
			  "capabilities": {
				"toastmaster": 0,
				"grammarian": 1,
				"evaluator": 1,
				"speaker": 1,
				"topicsmaster": 1,
				"timekeeper": 1,
				"general-evaluator": 0
			  },
			  "history": {
				"grammarian": [],
				"evaluator": [],
				"speaker": [],
				"topicsmaster": [],
				"timekeeper": ["2019-02-21"]
			  }
			},
			{
			  "name": "jonathan-wong",
			  "capabilities": {
				"toastmaster": 0,
				"grammarian": 1,
				"evaluator": 1,
				"speaker": 1,
				"topicsmaster": 1,
				"timekeeper": 1,
				"general-evaluator": 0
			  },
			  "history": {
				"grammarian": [],
				"evaluator": ["2018-04-26"],
				"speaker": [],
				"topicsmaster": [],
				"timekeeper": []
			  }
			},
			{
			  "name": "yasmine-sarhangi",
			  "capabilities": {
				"toastmaster": 1,
				"grammarian": 1,
				"evaluator": 1,
				"speaker": 1,
				"topicsmaster": 1,
				"timekeeper": 1,
				"general-evaluator": 0
			  },
			  "history": {
				"toastmaster": [],
				"grammarian": [],
				"evaluator": ["2019-05-15"],
				"speaker": ["2019-05-15"],
				"topicsmaster": ["2019-02-21"],
				"timekeeper": []
			  }
			},
			{
			  "name": "reem-abdalla",
			  "capabilities": {
				"toastmaster": 1,
				"grammarian": 1,
				"evaluator": 1,
				"speaker": 1,
				"topicsmaster": 1,
				"timekeeper": 1,
				"general-evaluator": 1
			  },
			  "history": {
				"toastmaster": ["2019-07-18"],
				"grammarian": ["2019-03-27"],
				"evaluator": ["2019-02-21"],
				"speaker": ["2019-04-17"],
				"topicsmaster": [],
				"timekeeper": ["2018-04-26"],
				"general-evaluator": ["2019-06-27"]
			  }
			},
			{
			  "name": "kyle-paterson",
			  "capabilities": {
				"toastmaster": 0,
				"grammarian": 1,
				"evaluator": 1,
				"speaker": 1,
				"topicsmaster": 1,
				"timekeeper": 1,
				"general-evaluator": 0
			  },
			  "history": {
				"toastmaster": [],
				"grammarian": ["2018-06-07"],
				"evaluator": [],
				"speaker": [],
				"topicsmaster": [],
				"timekeeper": []
			  }
			},
			{
			  "name": "eric-wong",
			  "capabilities": {
				"toastmaster": 1,
				"grammarian": 1,
				"evaluator": 1,
				"speaker": 1,
				"topicsmaster": 1,
				"timekeeper": 1,
				"general-evaluator": 1
			  },
			  "history": {
				"toastmaster": ["2019-02-21"],
				"grammarian": ["2019-05-15"],
				"evaluator": ["2018-10-18"],
				"speaker": ["2019-06-27"],
				"topicsmaster": ["2019-06-06"],
				"timekeeper": [],
				"general-evaluator": ["2019-07-18"]
			  }
			},
			{
			  "name": "sarene-jamaluddin",
			  "capabilities": {
				"toastmaster": 0,
				"grammarian": 1,
				"evaluator": 1,
				"speaker": 1,
				"topicsmaster": 1,
				"timekeeper": 1,
				"general-evaluator": 0
			  },
			  "history": {
				"toastmaster": [],
				"grammarian": [],
				"evaluator": [],
				"speaker": [],
				"topicsmaster": ["2018-09-27"],
				"timekeeper": []
			  }
			},
			{
			  "name": "rachit-pandya",
			  "capabilities": {
				"toastmaster": 1,
				"grammarian": 1,
				"evaluator": 1,
				"speaker": 1,
				"topicsmaster": 1,
				"timekeeper": 1,
				"general-evaluator": 0
			  },
			  "history": {
				"toastmaster": ["2019-05-15"],
				"grammarian": ["2019-06-27"],
				"evaluator": ["2019-07-18"],
				"speaker": ["2018-09-27"],
				"topicsmaster": [],
				"timekeeper": []
			  }
			},
			{
			  "name": "semhar-biniam",
			  "capabilities": {
				"toastmaster": 1,
				"grammarian": 1,
				"evaluator": 1,
				"speaker": 1,
				"topicsmaster": 1,
				"timekeeper": 1,
				"general-evaluator": 0
			  },
			  "history": {
				"toastmaster": [],
				"grammarian": ["2018-04-26"],
				"evaluator": ["2018-09-27"],
				"speaker": [],
				"topicsmaster": [],
				"timekeeper": ["2018-10-18"]
			  }
			},
			{
			  "name": "mo-khatib",
			  "capabilities": {
				"toastmaster": 0,
				"grammarian": 1,
				"evaluator": 1,
				"speaker": 1,
				"topicsmaster": 1,
				"timekeeper": 1,
				"general-evaluator": 0
			  },
			  "history": {
				"toastmaster": [],
				"grammarian": [],
				"evaluator": ["2018-09-27"],
				"speaker": ["2018-10-18"],
				"topicsmaster": [],
				"timekeeper": []
			  }
			},
			{
			  "name": "keegan-grimminck",
			  "capabilities": {
				"toastmaster": 1,
				"grammarian": 1,
				"evaluator": 1,
				"speaker": 1,
				"topicsmaster": 1,
				"timekeeper": 1,
				"general-evaluator": 0
			  },
			  "history": {
				"toastmaster": ["2019-06-06"],
				"grammarian": ["2018-09-27"],
				"evaluator": ["2019-03-27"],
				"speaker": ["2018-06-07"],
				"topicsmaster": [],
				"timekeeper": []
			  }
			},
			{
			  "name": "lisa-samtani",
			  "capabilities": {
				"toastmaster": 0,
				"grammarian": 1,
				"evaluator": 1,
				"speaker": 1,
				"topicsmaster": 1,
				"timekeeper": 1,
				"general-evaluator": 0
			  },
			  "history": {
				"grammarian": [],
				"evaluator": [],
				"speaker": [],
				"topicsmaster": [],
				"timekeeper": ["2018-11-08"]
			  }
			},
			{
			  "name": "pam-greenstein",
			  "capabilities": {
				"toastmaster": 0,
				"grammarian": 1,
				"evaluator": 1,
				"speaker": 1,
				"topicsmaster": 1,
				"timekeeper": 1,
				"general-evaluator": 0
			  },
			  "history": {
				"toastmaster": [],
				"grammarian": [],
				"evaluator": ["2018-11-08"],
				"speaker": [],
				"topicsmaster": [],
				"timekeeper": []
			  }
			},
			{
			  "name": "frank-zhou",
			  "capabilities": {
				"toastmaster": 1,
				"grammarian": 1,
				"evaluator": 1,
				"speaker": 1,
				"topicsmaster": 1,
				"timekeeper": 1,
				"general-evaluator": 0
			  },
			  "history": {
				"toastmaster": ["2019-06-27"],
				"grammarian": ["2019-02-21"],
				"evaluator": [],
				"speaker": ["2019-07-18"],
				"topicsmaster": [],
				"timekeeper": []
			  }
			},
			{
			  "name": "cornell-skyers",
			  "capabilities": {
				"toastmaster": 1,
				"grammarian": 1,
				"evaluator": 1,
				"speaker": 1,
				"topicsmaster": 1,
				"timekeeper": 1,
				"general-evaluator": 0
			  },
			  "history": {
				"toastmaster": ["2018-11-08"],
				"grammarian": [],
				"evaluator": ["2019-04-17"],
				"speaker": ["2018-10-18"],
				"topicsmaster": ["2019-07-18"],
				"timekeeper": ["2019-03-27"]
			  }
			},
			{
			  "name": "david-adade",
			  "capabilities": {
				"toastmaster": 1,
				"grammarian": 1,
				"evaluator": 1,
				"speaker": 1,
				"topicsmaster": 1,
				"timekeeper": 1,
				"general-evaluator": 0
			  },
			  "history": {
				"toastmaster": [],
				"grammarian": ["2018-10-18"],
				"evaluator": [],
				"speaker": [],
				"topicsmaster": [],
				"timekeeper": ["2018-06-07"]
			  }
			},
			{
			  "name": "mathias-tello",
			  "capabilities": {
				"toastmaster": 1,
				"grammarian": 1,
				"evaluator": 1,
				"speaker": 1,
				"topicsmaster": 1,
				"timekeeper": 1,
				"general-evaluator": 1
			  },
			  "history": {
				"toastmaster": ["2018-04-26"],
				"grammarian": [],
				"evaluator": [],
				"speaker": [],
				"topicsmaster": [],
				"timekeeper": [],
				"general-evaluator": ["2019-06-07"]
			  }
			},
			{
			  "name": "maria-acevedo",
			  "capabilities": {
				"toastmaster": 1,
				"grammarian": 1,
				"evaluator": 1,
				"speaker": 1,
				"topicsmaster": 1,
				"timekeeper": 1,
				"general-evaluator": 0
			  },
			  "history": {
				"toastmaster": ["2019-03-17"],
				"grammarian": [],
				"evaluator": ["2019-01-31"],
				"speaker": ["2018-11-08"],
				"topicsmaster": ["2019-03-27"],
				"timekeeper": ["2019-07-18"]
			  }
			},
			{
			  "name": "joanna-zkaradzinski",
			  "capabilities": {
				"toastmaster": 1,
				"grammarian": 1,
				"evaluator": 1,
				"speaker": 1,
				"topicsmaster": 1,
				"timekeeper": 1,
				"general-evaluator": 0
			  },
			  "history": {
				"toastmaster": [],
				"grammarian": [],
				"evaluator": ["2019-05-15"],
				"speaker": ["2019-06-06"],
				"topicsmaster": ["2018-11-08"],
				"timekeeper": ["2019-06-27"]
			  }
			},
			{
			  "name": "andrea-richardson",
			  "capabilities": {
				"toastmaster": 1,
				"grammarian": 1,
				"evaluator": 1,
				"speaker": 1,
				"topicsmaster": 1,
				"timekeeper": 1,
				"general-evaluator": 0
			  },
			  "history": {
				"toastmaster": ["2019-03-27"],
				"grammarian": ["2019-01-31"],
				"evaluator": ["2019-05-15"],
				"speaker": [],
				"topicsmaster": ["2019-04-17"],
				"timekeeper": ["2019-06-06"]
			  }
			},
			{
			  "name": "matthew-steinberg",
			  "capabilities": {
				"toastmaster": 1,
				"grammarian": 1,
				"evaluator": 1,
				"speaker": 1,
				"topicsmaster": 1,
				"timekeeper": 1,
				"general-evaluator": 1
			  },
			  "history": {
				"toastmaster": ["2019-01-31"],
				"grammarian": [],
				"evaluator": ["2019-06-27"],
				"speaker": ["2019-04-17"],
				"topicsmaster": ["2018-04-26"],
				"timekeeper": ["2019-05-15"],
				"general-evaluator": ["2019-02-21"]
			  }
			},
			{
			  "name": "dan-barmasch",
			  "capabilities": {
				"toastmaster": 1,
				"grammarian": 1,
				"evaluator": 1,
				"speaker": 1,
				"topicsmaster": 1,
				"timekeeper": 1,
				"general-evaluator": 1
			  },
			  "history": {
				"toastmaster": ["2018-06-07"],
				"grammarian": ["2018-06-07"],
				"evaluator": ["2019-02-21"],
				"speaker": ["2019-06-27"],
				"topicsmaster": ["2018-10-18"],
				"timekeeper": [],
				"general-evaluator": ["2019-04-17"]
			  }
			}
		  ],
		  "roles": [
			{
			  "name": "toastmaster",
			  "quantity": 1
			},
			{
			  "name": "grammarian",
			  "quantity": 1
			},
			{
			  "name": "evaluator",
			  "quantity": 2
			},
			{
			  "name": "speaker",
			  "quantity": 2
			},
			{
			  "name": "topicsmaster",
			  "quantity": 1
			},
			{
			  "name": "timekeeper",
			  "quantity": 1
			},
			{
			  "name": "general-evaluator",
			  "quantity": 1
			}
		  ],
		  "schedules": [
			{
			  "session-date": "2019-04-17",
			  "roles": [
				{
				  "role": "toastmaster",
				  "user": "maria-acevedo"
				},
				{
				  "role": "grammarian",
				  "user": "leonard-yu"
				},
				{
				  "role": "evaluator",
				  "user": "kurt-henry"
				},
				{
				  "role": "evaluator",
				  "user": "cornell-skyers"
				},
				{
				  "role": "speaker",
				  "user": "matthew-steinberg"
				},
				{
				  "role": "speaker",
				  "user": "reem-abdalla"
				},
				{
				  "role": "topicsmaster",
				  "user": "andrea-richardson"
				},
				{
				  "role": "timekeeper",
				  "user": "chandira-manoharan"
				},
				{
				  "role": "general-evaluator",
				  "user": "dan-barmasch"
				}
			  ]
			},
			{
			  "session-date": "2019-03-27",
			  "roles": [
				{
				  "role": "toastmaster",
				  "user": "andrea-richardson"
				},
				{
				  "role": "grammarian",
				  "user": "reem-abdalla"
				},
				{
				  "role": "evaluator",
				  "user": "dana-woo"
				},
				{
				  "role": "evaluator",
				  "user": "keegan-grimminck"
				},
				{
				  "role": "speaker",
				  "user": "krishna-jayarajan"
				},
				{
				  "role": "speaker",
				  "user": "eric-wong"
				},
				{
				  "role": "topicsmaster",
				  "user": "maria-acevedo"
				},
				{
				  "role": "timekeeper",
				  "user": "cornell-skyers"
				},
				{
				  "role": "general-evaluator",
				  "user": "mathias-tello"
				}
			  ]
			}
		  ]
		},
		"session-state": {
		  "session-date": "2020-07-31 15:33:17"
		}
	  };
}