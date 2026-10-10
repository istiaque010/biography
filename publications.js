/* ---------------------------------------------------------------------------
   Publication data — one object per item. This is the only file you edit
   when a paper lands.

   Loaded as a plain script rather than fetched JSON, so the site also works
   when index.html is opened straight from disk (file:// blocks fetch).

   type:  "journal" | "conference" | "chapter" | "preprint" | "review"
          | "presentation"

   Optional fields may be omitted entirely: volume, number, pages, artno,
   location, publisher, editors, chapter, doi, arxiv, primaryClass, pdf,
   code, note, tags.
   pdf / code take URLs; for a local file use e.g. "pdf/apcc2025.pdf".
--------------------------------------------------------------------------- */

window.ME = "Istiaque Ahmed";

window.PUBLICATIONS = [

  /* ---------------------------- Journal articles -------------------------- */
  {
    id: "tsusc2026-recycling",
    type: "journal",
    title: "Leveraging Blockchain and AI for Sustainable Recycling and Raw Materials Traceability in the Vehicle Industry",
    authors: ["Istiaque Ahmed", "K. Chowdhury", "K. Toyoda", "T. Nakano", "T. H. Tran"],
    venue: "IEEE Transactions on Sustainable Computing",
    volume: "11", number: "3", pages: "227–239", year: 2026,
    doi: "10.1109/TSUSC.2026.3672831",
    selected: true,
    tags: ["blockchain", "AI", "traceability"]
  },
  {
    id: "access2025-vcagg",
    type: "journal",
    title: "Efficient Verifiable Credential Aggregation with Blockchain Anchoring and zk-SNARKs",
    authors: ["Istiaque Ahmed", "K. Toyoda", "T. Nakano", "T. H. Tran"],
    venue: "IEEE Access",
    volume: "13", pages: "191863–191874", year: 2025,
    doi: "10.1109/ACCESS.2025.3627625",
    selected: true,
    tags: ["ZKP", "verifiable credentials", "blockchain"]
  },
  {
    id: "iotj2025-ekyc-review",
    type: "journal",
    title: "A Systematic Review on Blockchain-Enabled eKYC: Leveraging SSI and DID for Secure and Efficient Identity Verification",
    authors: ["Istiaque Ahmed", "K. Toyoda", "T. Nakano", "S. Kasahara", "S. R. Goyal", "T. H. Tran"],
    venue: "IEEE Internet of Things Journal",
    volume: "12", number: "21", pages: "44381–44401", year: 2025,
    doi: "10.1109/JIOT.2025.3597356",
    selected: true,
    tags: ["eKYC", "SSI", "DID"]
  },
  {
    id: "digital2026-apollo",
    type: "journal",
    title: "APOLLO: Autonomous Predictive On-Chain Learning Orchestrator for AI-Driven Blockchain Governance",
    authors: ["Istiaque Ahmed", "Z. M. Zubraj", "M. S. Ferdous", "T. Nakano", "T. H. Tran"],
    venue: "Digital",
    volume: "6", number: "1", artno: "3", year: 2026,
    doi: "10.3390/digital6010003",
    tags: ["agentic AI", "governance", "blockchain"]
  },
  {
    id: "sustainability2024-charity",
    type: "journal",
    title: "Blockchain-Empowered Decentralized Philanthropic Charity for Social Good",
    authors: ["Istiaque Ahmed", "K. Fumimoto", "T. Nakano", "T. H. Tran"],
    venue: "Sustainability",
    volume: "16", number: "1", artno: "210", year: 2024,
    doi: "10.3390/su16010210",
    tags: ["blockchain", "smart contracts"]
  },
  {
    id: "revjec2024-crowdfunding",
    type: "journal",
    title: "A Reliable and Secure Crowdfunding Platform Using Decentralized Blockchain",
    authors: ["H. Tanise", "Q. D. N. Nguyen", "Istiaque Ahmed", "T. H. Tran"],
    venue: "REV Journal on Electronics and Communications",
    volume: "14", number: "3", pages: "30–38", year: 2024,
    doi: "10.21553/rev-jec.365",
    tags: ["blockchain", "dApps"]
  },
  {
    id: "gsj2021-wsn",
    type: "journal",
    title: "Job Scheduling and Resource Planning in Wireless Sensor Networks",
    authors: ["Istiaque Ahmed", "F. Morium", "G. M. F. Hossain"],
    venue: "Global Scientific Journal",
    volume: "9", number: "1", pages: "650–653", year: 2021,
    doi: "10.11216/gsj.2021.01.47613",
    tags: ["WSN"]
  },
  {
    id: "ijarcce2020-iot-fingerprint",
    type: "journal",
    title: "Crux in IoT Devices Access Control Modules Using Fingerprint and Overcome Approach",
    authors: ["Istiaque Ahmed", "Sk. M. Hasan", "F. Morium"],
    venue: "International Journal of Advanced Research in Computer and Communication Engineering",
    volume: "9", number: "12", pages: "61–67", year: 2020,
    doi: "10.17148/IJARCCE.2020.91210",
    tags: ["IoT", "access control"]
  },
  {
    id: "jcta-server-os",
    type: "journal",
    title: "Server-Based Operating System Research Direction for the Future Smart World Using the Internet of Things",
    authors: ["Istiaque Ahmed", "M. Rokanujjaman", "A. F. Ahmad"],
    venue: "Journal of Computer Technology & Applications",
    volume: "8", number: "2", pages: "26–32",
    year: null,                                  /* TODO: year not in CV */
    tags: ["IoT", "operating systems"]
  },
  {
    id: "ijiacs-gait",
    type: "journal",
    title: "Gait-Based Person Identification Considering Clothing Variation",
    authors: ["Istiaque Ahmed", "M. Rokanujjaman"],
    venue: "International Journal of Innovations & Advancement in Computer Science",
    volume: "5", number: "6", pages: "28–42",
    year: null,                                  /* TODO: year not in CV */
    tags: ["biometrics", "computer vision"]
  },

  /* ------------------------------ Book chapters --------------------------- */
  {
    id: "springer2024-eeg",
    type: "chapter",
    title: "Seizure Detection by Analyzing EEG Signals Using Deep Learning Networks",
    authors: ["A. Agarwal", "R. Trivedi", "S. R. Goyal", "Istiaque Ahmed"],
    venue: "Advances in Data-Driven Computing and Intelligent Systems",
    editors: "S. Das, S. Saha, C. A. Coello Coello and J. C. Bansal, Eds.",
    publisher: "Springer Nature Singapore",
    pages: "65–76", year: 2024,
    doi: "10.1007/978-981-99-9524-0_6",
    tags: ["deep learning", "biomedical"]
  },
  {
    id: "springer2023-gps-gsm",
    type: "chapter",
    title: "Tracking of Lost Objects Using GPS and GSM",
    authors: ["M. Nagar", "H. Bhattacharya", "A. Gupta", "S. R. Goyal", "Istiaque Ahmed"],
    venue: "Intelligent Data Engineering and Analytics",
    editors: "V. Bhateja, X.-S. Yang, J. C.-W. Lin and R. Das, Eds.",
    publisher: "Springer Nature Singapore",
    pages: "577–585", year: 2023,
    doi: "10.1007/978-981-19-7524-0_51",
    tags: ["embedded", "IoT"]
  },
  {
    id: "wiley2023-genomics",
    type: "chapter",
    title: "An Overview of Genomics and Frontiers in Genetics for the Smart Era",
    authors: ["S. Bafna", "A. Shedage", "A. Agarwal", "S. R. Goyal", "Istiaque Ahmed"],
    venue: "Privacy Preservation of Genomic and Medical Data",
    editors: "A. K. Tyagi, Ed.",
    publisher: "Wiley, Hoboken, NJ, USA",
    chapter: "2", pages: "19–43", year: 2023,
    doi: "10.1002/9781394213726.ch2",
    tags: ["privacy", "genomics"]
  },

  /* --------------------------- Conference papers -------------------------- */
  {
    id: "apcc2025-ekyc",
    type: "conference",
    title: "A Privacy-Preserving Selectively Disclosed eKYC System Using Merkle Tree and Zero-Knowledge Proofs",
    authors: ["Istiaque Ahmed", "T. Nakano", "K. Toyoda", "T. H. Tran"],
    venue: "Proc. 30th Asia-Pacific Conf. on Communications (APCC)",
    location: "Osaka, Japan",
    pages: "1–6", year: 2025,
    doi: "10.23919/APCC64555.2025.11279937",
    tags: ["ZKP", "eKYC", "Merkle tree"]
  },
  {
    id: "spicscon2025-ecdsa",
    type: "conference",
    title: "A Blockchain-Based ECDSA Framework for Drug Authentication and Traceability in Bangladeshi Healthcare",
    authors: ["S. A. Saha", "M. S. Sinthia", "S. Ahmad", "Istiaque Ahmed"],
    venue: "Proc. IEEE Int. Conf. on Signal Processing, Information, Communication and Systems (SPICSCON)",
    location: "Rajshahi, Bangladesh",
    pages: "81–86", year: 2025,
    doi: "10.1109/SPICSCON69221.2025.11504162",
    tags: ["blockchain", "healthcare"]
  },
  {
    id: "spicscon2025-ipfs",
    type: "conference",
    title: "Disaster-Proof File Management Using Blockchain and IPFS for Data Security",
    authors: ["S. Ahmed", "M. F. Yousuf", "S. Ahmad", "Istiaque Ahmed"],
    venue: "Proc. IEEE Int. Conf. on Signal Processing, Information, Communication and Systems (SPICSCON)",
    location: "Rajshahi, Bangladesh",
    pages: "87–92", year: 2025,
    doi: "10.1109/SPICSCON69221.2025.11504209",
    tags: ["blockchain", "IPFS"]
  },
  {
    id: "qpain2025-lightweight-crypto",
    type: "conference",
    title: "Lightweight Cryptographic Algorithm Analysis for Secure IoT Communication on ESP-32 Platforms",
    authors: ["S. H. Rafat", "M. N. Jarin", "T. M. Mahdee", "A. S. M. Miah", "N. Haque", "M. M. R. Tusher", "J. Shin", "Istiaque Ahmed"],
    venue: "Proc. Int. Conf. on Quantum Photonics, Artificial Intelligence, and Networking (QPAIN)",
    pages: "1–6", year: 2025,
    doi: "10.1109/QPAIN66474.2025.11171742",
    tags: ["cryptography", "IoT", "embedded"]
  },
  {
    id: "sti2020-smartphone-security",
    type: "conference",
    title: "Information Security and User Concern in Smartphones",
    authors: ["Istiaque Ahmed", "Sk. M. Hasan", "F. Morium"],
    venue: "Proc. 2nd Int. Conf. on Sustainable Technologies for Industry 4.0 (STI)",
    location: "Dhaka, Bangladesh",
    year: 2020,
    tags: ["security", "usable privacy"]
  },
  {
    id: "icerie2017-gait",
    type: "conference",
    title: "Gait Recognition Performance Enhancement Using Dynamic Parts Selection",
    authors: ["Istiaque Ahmed"],
    venue: "Proc. Int. Conf. on Engineering Research, Innovation and Education (ICERIE)",
    location: "Bangladesh",
    pages: "1–7", year: 2017,
    note: "Paper ICERIE 2017_010",
    tags: ["biometrics", "computer vision"]
  },

  /* ------------------------- Other presentations -------------------------- */
  {
    id: "ipsj2023-charity",
    type: "presentation",
    title: "Decentralized and Transparent Charity Implementation in Ethereum",
    authors: ["Istiaque Ahmed", "K. Fumimoto", "T. Nakano", "T. H. Tran"],
    venue: "IPSJ Kansai Branch Conference",
    location: "Kyoto, Japan",
    pages: "1–3", year: 2023,
    tags: ["Ethereum"]
  },
  {
    id: "kicfs2021-crypto-rnn",
    type: "presentation",
    title: "RNN-Based Prediction for Multi-Cryptocurrency Price Correlation",
    authors: ["R. S. M. Wahidur", "M. A. Rathore", "Istiaque Ahmed", "H.-N. Lee"],
    venue: "Korea Information and Communications Facilities Society Fall Conference",
    location: "Republic of Korea",
    year: 2021,
    tags: ["machine learning", "fintech"]
  },

  /* ---------------------------- Under review ------------------------------ */
  {
    id: "jisa-mpc-identity",
    type: "review",
    title: "Transparent Identity Verification Approach Using MPC and Efficient Credential Status Handling",
    authors: ["Istiaque Ahmed", "M. S. Hossain", "S. Kasahara", "K. Toyoda", "T. Nakano", "T. H. Tran"],
    venue: "Journal of Information Security and Applications (Elsevier)",
    year: 2026,
    note: "Under review, round 1",
    tags: ["MPC", "identity"]
  },
  {
    id: "crc-llm-cybersecurity",
    type: "review",
    title: "The Role of Large Language Models in Cyber Security",
    authors: ["S. R. Goyal", "Istiaque Ahmed"],
    venue: "AI-IoT-6G Enabled Smart Environment for Industry 5.0 and Society 5.0",
    editors: "A. K. Tyagi, Ed.",
    publisher: "CRC Press, Taylor & Francis",
    chapter: "15", year: 2025,
    note: "Submitted November 2025",
    tags: ["LLM", "security"]
  },

  /* ------------------------------ Preprints ------------------------------- */
  {
    id: "arxiv2026-reflex-guard",
    type: "preprint",
    title: "Reflex-Guard: A Low-Latency Guardrail for LLM Prompt Safety Using Dense Semantic Embeddings",
    authors: ["Istiaque Ahmed", "A. A. Borsha", "R. D. Prangon", "A. F. Ahmad", "T. H. Tran"],
    arxiv: "2608.17556", primaryClass: "cs.CR", year: 2026,
    selected: true,
    tags: ["LLM safety", "guardrails", "AI security"]
  },
  {
    id: "arxiv2026-lowrank-medical",
    type: "preprint",
    title: "Transferable Low-Rank Convolutional Bases for Onboarding Unseen Medical Imaging Modalities",
    authors: ["R. D. Prangon", "Istiaque Ahmed", "S. H. Naim", "W. M. Zisan", "H. M. Shakhawat"],
    arxiv: "2607.16888", primaryClass: "cs.CV", year: 2026,
    tags: ["medical imaging", "transfer learning"]
  },
  {
    id: "arxiv2026-bars",
    type: "preprint",
    title: "BARS: Benign-Anchored Ranking and Selection for False Alarm Reduction in Network Intrusion Detection",
    authors: ["A. F. Ahmad", "Istiaque Ahmed"],
    arxiv: "2607.13203", primaryClass: "cs.CR", year: 2026,
    tags: ["intrusion detection", "AI security"]
  },
  {
    id: "arxiv2026-ncmd",
    type: "preprint",
    title: "nCMD: Benign-Anchored Feature Selection for Imbalanced Network Intrusion Detection",
    authors: ["A. F. Ahmad", "Istiaque Ahmed"],
    arxiv: "2606.09934", primaryClass: "cs.LG", year: 2026,
    tags: ["intrusion detection", "feature selection"]
  },
  {
    id: "arxiv2024-missing-values",
    type: "preprint",
    title: "Impact of Missing Values in Machine Learning: A Comprehensive Analysis",
    authors: ["A. F. Ahmad", "M. S. Sayeed", "K. Alshammari", "Istiaque Ahmed"],
    arxiv: "2410.08295", primaryClass: "cs.LG", year: 2024,
    tags: ["machine learning"]
  }
];
